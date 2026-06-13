(() => {
  const featuredIncidents = [
    [
      "The sibling matcher compared only the first and last letters. Jordan and Jonathan became one person, and every payment went to the sibling entered first.",
      404,
      12000,
    ],
    [
      "The emergency payment fix added LIMIT 1 without ORDER BY. Finance calls the result 'first come, first funded'.",
      512,
      18000,
    ],
    [
      "A family account merge treated twins as duplicate records and archived whichever one answered the phone second.",
      286,
      7000,
    ],
    [
      "The refund batch used the customer's current bank account and the vendor's previous bank account. Everybody received closure.",
      638,
      26000,
    ],
    [
      "A payroll validation rule rejected negative overtime by converting it into positive overtime. Morale briefly became expensive.",
      731,
      42000,
    ],
    [
      "The deduplication job removed duplicate invoices and both originals for completeness.",
      377,
      9500,
    ],
    [
      "The customer merge kept the oldest address. Three thousand parcels are returning to a student apartment from 2008.",
      463,
      15000,
    ],
    [
      "The fraud model learned that every legitimate payment happens before lunch. Night-shift workers are now organized crime.",
      589,
      32000,
    ],
    [
      "The new name parser stored 'Mary Ann' as Mary and assigned Ann as her emergency contact.",
      247,
      5200,
    ],
    [
      "A date-of-birth import interpreted 03/04 consistently. Unfortunately, it chose the other consistency.",
      341,
      8400,
    ],
    [
      "The account-linking API matched households by postcode. One apartment tower now shares a loyalty balance and several opinions.",
      695,
      38000,
    ],
    [
      "The urgent hotfix corrected every payment except the urgent payment used to verify the hotfix.",
      823,
      60000,
    ],
  ].map(([label, amount, minResolved]) => ({ label, amount, minResolved }));

  const affectedSystems = [
    "Payroll",
    "The identity platform",
    "The customer relationship system",
    "The finance workbook",
    "The employee onboarding portal",
    "The payment gateway",
    "The warehouse management system",
    "The data lake",
    "The overnight ETL pipeline",
    "The executive dashboard",
    "The VPN service",
    "The office Wi-Fi controller",
    "The backup platform",
    "The monitoring stack",
    "The service desk portal",
    "The mobile application",
    "The document management system",
    "The API gateway",
    "The Kubernetes platform",
    "The production database",
  ];

  const failurePatterns = [
    (system) =>
      `${system} passed user acceptance testing after every tester used the administrator account.`,
    (system) =>
      `${system}'s production configuration lives in an email attachment named FINAL_USE_THIS_v4.xlsx.`,
    (system) =>
      `${system} has three documented owners: Business, Technology, and someone who left in 2019.`,
    (system) =>
      `${system}'s alert mailbox is full of alerts warning that the alert mailbox is full.`,
    (system) =>
      `${system} was migrated successfully. Only the users, data, integrations, and support team were left behind.`,
    (system) =>
      `${system} requires a restart, but restarts need approval from the system that is waiting to restart.`,
    (system) =>
      `${system}'s vendor confirmed the issue is impossible while screen-sharing the issue.`,
    (system) =>
      `${system} uses local time, the database uses UTC, and the monthly report uses professional intuition.`,
    (system) =>
      `${system}'s rollback plan is a screenshot of the deployment plan with the arrows reversed.`,
    (system) =>
      `${system} became highly available by placing both servers on the same power board.`,
  ];

  const patternedIncidents = affectedSystems.flatMap((system, systemIndex) =>
    failurePatterns.map((buildLabel, patternIndex) => ({
      label: buildLabel(system),
      amount: 28 + systemIndex * 11 + patternIndex * 17,
      minResolved: Math.round(
        40 * Math.pow(1.24, systemIndex + patternIndex * 1.4),
      ),
    })),
  );

  window.ticketClickerIncidentCatalog = [
    ...featuredIncidents,
    ...patternedIncidents,
  ];
})();
