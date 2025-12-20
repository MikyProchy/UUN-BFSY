"use client";

import React from "react";
import { useLocale } from "use-intl";
import { Link } from "@/i18n/navigation";

const LangSwitch = () => {
  const locale = useLocale();
  const next = locale === "cs" ? "en" : "cs";

  return (
    <h3 className="text-lg font-bold text-white">
      <Link locale={next} href="/">
        {next.toUpperCase()}
      </Link>
    </h3>
  );
};

export default LangSwitch;
