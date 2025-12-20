import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ContextProviders from "@/components/core/ContextProviders";
import React from "react";
import { ToggleDarkMode } from "@/components/common/ToggleDarkMode";
import LangSwitch from "@/components/common/LangSwitch";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  const t = await getTranslations("Nav");

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="w-full h-16 border-b border-primary absolute top-0 bg-primary-light flex justify-center items-center">
            <div className="max-w-[1440px] flex items-center h-full mx-4 justify-between w-full">
              <h1 className="text-2xl font-bold text-white">{t("title")}</h1>
              <div className="flex gap-2 items-center">
                <LangSwitch />
                <ToggleDarkMode />
              </div>
            </div>
          </div>
          <ContextProviders>{children}</ContextProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
