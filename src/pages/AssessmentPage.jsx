import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

import AssessmentStatistic from "../features/skillAssessment/components/AssessmentStatistic";
import AssessmentStart from "../features/skillAssessment/components/AssessmentStart";
import QuizAssessment from "../features/skillAssessment/components/QuizAssessment";
import ProcessingAssessment from "../features/skillAssessment/components/ProcessingAssessment";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import skillAssessmentService from "../features/skillAssessment/services/skillAssessmentService";
import rolesService from "../services/rolesService";

const normalizeText = (value = "") =>
  value.toString().toLowerCase().replace(/[^a-z0-9]/g, "");

const alignResultWithRole = (result, role) => {
  if (!result) return null;

  const resultRole = result.role_applied || "";
  const isDifferentRole =
    role && resultRole && normalizeText(role) !== normalizeText(resultRole);

  return {
    ...result,
    role_applied: role || resultRole,
    skills_analysis: isDifferentRole ? [] : result.skills_analysis,
  };
};

const resolveSelectedCareerRole = async ({ user, refreshUser }) => {
  if (user?.role) return user.role;

  if (user?.roleId) {
    const roleData = await rolesService.resolveRoleById(user.roleId);
    if (roleData?.name) return roleData.name;
  }

  const profile = await refreshUser();
  if (profile?.role) return profile.role;

  if (profile?.roleId) {
    const roleData = await rolesService.resolveRoleById(profile.roleId);
    if (roleData?.name) return roleData.name;
  }

  return "";
};

function AssessmentPage() {
  const { user, refreshUser } = useAuth();
  const [currentPage, setCurrentPage] = useState("start");
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [resolvedRole, setResolvedRole] = useState(user?.role || "");
  const [startError, setStartError] = useState("");
  const [resolvingRole, setResolvingRole] = useState(() => Boolean(user && !user.role));

  const userRole = user?.role || "";
  const roleId = user?.roleId;
  const role = resolvedRole || userRole || "";
  const statisticRole = role || assessmentResult?.role_applied || "";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [currentPage]);

  useEffect(() => {
    let isMounted = true;

    const resolveUserRole = async () => {
      if (userRole) {
        setResolvedRole(userRole);
        setStartError("");
        setResolvingRole(false);
        return;
      }

      setResolvingRole(true);
      try {
        const roleName = await resolveSelectedCareerRole({
          user: { role: userRole, roleId },
          refreshUser,
        });
        if (isMounted) {
          setResolvedRole(roleName);
          if (roleName) setStartError("");
        }
      } catch {
        if (isMounted) setResolvedRole("");
      } finally {
        if (isMounted) setResolvingRole(false);
      }
    };

    resolveUserRole();

    return () => {
      isMounted = false;
    };
  }, [refreshUser, roleId, userRole]);

  useEffect(() => {
    let isMounted = true;

    const fetchLatestResult = async () => {
      if (!role) {
        setAssessmentResult(null);
        return;
      }

      try {
        const response = await skillAssessmentService.getLatestResult();
        if (isMounted) {
          setAssessmentResult(alignResultWithRole(response.data, role));
        }
      } catch {
        if (isMounted) setAssessmentResult(null);
      }
    };

    fetchLatestResult();

    return () => {
      isMounted = false;
    };
  }, [role]);

  const handleStartAssessment = useCallback(async () => {
    if (resolvingRole) return;

    let activeRole = role;

    if (!activeRole) {
      setResolvingRole(true);
      try {
        activeRole = await resolveSelectedCareerRole({
          user: { role: userRole, roleId },
          refreshUser,
        });
        setResolvedRole(activeRole);
      } catch {
        activeRole = "";
      } finally {
        setResolvingRole(false);
      }
    }

    if (!activeRole) {
      setStartError("Role karier belum terbaca. Pilih role karier terlebih dahulu atau login ulang.");
      return;
    }

    setStartError("");
    setCurrentPage("quiz");
  }, [refreshUser, resolvingRole, role, roleId, userRole]);

  return (
    <>
      <Navbar />

      {currentPage === "start" && (
        <>
          <AssessmentStart
            onStart={handleStartAssessment}
            disabled={resolvingRole}
            message={startError}
          />
          {statisticRole && (
            <AssessmentStatistic result={assessmentResult} role={statisticRole} />
          )}
        </>
      )}

      {currentPage === "quiz" && (
        <QuizAssessment
          role={role}
          roleId={roleId}
          onExit={() => setCurrentPage("start")}
          onFinish={(result) => {
            setAssessmentResult(alignResultWithRole(result, role));
            setCurrentPage("processing");
          }}
        />
      )}

      {currentPage === "processing" && (
        <ProcessingAssessment onComplete={() => setCurrentPage("result")} />
      )}

      {currentPage === "result" && (
        <>
          <AssessmentStart
            onStart={handleStartAssessment}
            disabled={resolvingRole}
            message={startError}
          />
          {statisticRole && (
            <AssessmentStatistic result={assessmentResult} role={statisticRole} />
          )}
        </>
      )}

      <Footer />
    </>
  );
}

export default AssessmentPage;
