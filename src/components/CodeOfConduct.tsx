import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const CodeOfConduct = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />

      <main className="mx-auto w-11/12 max-w-4xl py-12 md:py-16">
        <div className="rounded-2xl bg-white p-6 shadow-sm md:p-10">
          <h1 className="font-Anek text-3xl font-bold md:text-4xl">Code of Conduct</h1>
          <p className="mt-4 font-Inter text-base text-gray-600 md:text-lg">
            We are committed to fostering an open, welcoming, and harassment-free community for
            everyone who participates in CoverView. This Code of Conduct outlines the expectations
            we have for all contributors and maintainers.
          </p>

          <section className="mt-8">
            <h2 className="font-Anek text-2xl font-semibold md:text-3xl">Our Pledge</h2>
            <p className="mt-2 font-Inter text-base text-gray-700 md:text-lg">
              We pledge to make participation in our project and community a harassment-free
              experience for everyone, regardless of age, body size, visible or invisible
              disability, ethnicity, sex characteristics, gender identity and expression, level of
              experience, education, socio-economic status, nationality, personal appearance, race,
              religion, or sexual identity and orientation.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="font-Anek text-2xl font-semibold md:text-3xl">Our Standards</h2>
            <p className="mt-2 font-Inter text-base text-gray-700 md:text-lg">
              Examples of behavior that contributes to a positive environment include:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 font-Inter text-base text-gray-700 md:text-lg">
              <li>Demonstrating empathy, kindness, and respect for all people</li>
              <li>Giving and gracefully accepting constructive feedback</li>
              <li>Focusing on what is best for the community</li>
              <li>Showing appreciation for diverse opinions and experiences</li>
            </ul>
            <p className="mt-6 font-Inter text-base text-gray-700 md:text-lg">
              Examples of unacceptable behavior include:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 font-Inter text-base text-gray-700 md:text-lg">
              <li>Harassment, discrimination, or derogatory language</li>
              <li>Public or private harassment, including unwelcome sexual attention</li>
              <li>Publishing others' private information without explicit permission</li>
              <li>Any other conduct that could reasonably be considered inappropriate</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="font-Anek text-2xl font-semibold md:text-3xl">
              Enforcement Responsibilities
            </h2>
            <p className="mt-2 font-Inter text-base text-gray-700 md:text-lg">
              Project maintainers are responsible for clarifying and enforcing this Code of Conduct.
              They will take appropriate and fair corrective action in response to any behavior they
              deem inappropriate, threatening, offensive, or harmful.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="font-Anek text-2xl font-semibold md:text-3xl">Scope</h2>
            <p className="mt-2 font-Inter text-base text-gray-700 md:text-lg">
              This Code of Conduct applies to all project spaces, including repositories, issues,
              pull requests, discussions, and public or private communication channels related to
              the project. It also applies when individuals are officially representing the project.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="font-Anek text-2xl font-semibold md:text-3xl">Enforcement</h2>
            <p className="mt-2 font-Inter text-base text-gray-700 md:text-lg">
              Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to
              the maintainers through the project's GitHub issues or by email at
              <a className="ml-1 text-indigo-500 underline" href="mailto:deadmau5v@qq.com">
                deadmau5v@qq.com
              </a>
              . All complaints will be reviewed and investigated promptly and fairly. Maintainers
              are obligated to respect the privacy and security of the reporter of any incident.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="font-Anek text-2xl font-semibold md:text-3xl">Enforcement Guidelines</h2>
            <ol className="mt-4 list-decimal space-y-4 pl-6 font-Inter text-base text-gray-700 md:text-lg">
              <li>
                <span className="font-semibold">Correction</span>: Private feedback clarifying why
                the behavior was inappropriate.
              </li>
              <li>
                <span className="font-semibold">Warning</span>: A warning with consequences for
                continued behavior and a temporary limitation on interactions.
              </li>
              <li>
                <span className="font-semibold">Temporary Ban</span>: Suspension from interactions
                or public communication for a specified period.
              </li>
              <li>
                <span className="font-semibold">Permanent Ban</span>: A permanent ban from all
                community spaces after repeated or severe violations.
              </li>
            </ol>
          </section>

          <section className="mt-8">
            <h2 className="font-Anek text-2xl font-semibold md:text-3xl">Attribution</h2>
            <p className="mt-2 font-Inter text-base text-gray-700 md:text-lg">
              This Code of Conduct is adapted from the Contributor Covenant, version 2.1. Learn more
              at
              <a
                className="ml-1 text-indigo-500 underline"
                href="https://www.contributor-covenant.org"
                target="_blank"
                rel="noreferrer"
              >
                contributor-covenant.org
              </a>
              .
            </p>
          </section>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/"
              className="rounded-full border border-gray-200 px-4 py-2 font-Inter text-sm font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 md:text-base"
            >
              ← Back to Home
            </Link>
            <a
              href="https://github.com/deadmau5v/CoverView/blob/main/CODE_OF_CONDUCT.md"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-gray-200 px-4 py-2 font-Inter text-sm font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 md:text-base"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CodeOfConduct;
