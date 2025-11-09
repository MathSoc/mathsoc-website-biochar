import { Banner, BannerTitles } from "@/app/components/banner/banner";
import { Page } from "@/app/components/page/page-component";
import { Metadata } from "next";
import React from "react";
import "./exam-bank.scss";
import { ExamsTable } from "@/app/admin/components/exams-table/exams-table";
import { protectToStudents } from "../../auth.actions";

export const metadata: Metadata = { title: "Exam Bank" };

export default async function ExamBankPage() {
  await protectToStudents();

  return (
    <Page id="exam-bank-page">
      <Banner src="/img/banners/pinktie-mc.jpeg" variant="pink">
        <BannerTitles title="Exam Bank" />
      </Banner>
      <section className="table-section">
        <ExamsTable />
      </section>
    </Page>
  );
}
