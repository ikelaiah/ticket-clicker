(() => {
  const procurementItems = [
    {
      id: "mouse_mat",
      names: ["Mouse Mat", "Desk Navigation Surface", "Optical Mouse Runway"],
      detail:
        "The risk assessment covers wrist friction, desk alignment, and whether the logo faces management.",
    },
    {
      id: "usb_c_dongle",
      names: ["USB-C Dongle", "Port Compatibility Pebble", "Executive Adapter"],
      detail:
        "It adds three ports, removes one free hand, and will be missing before the first meeting.",
    },
    {
      id: "laptop_stand",
      names: ["Laptop Stand", "Ergonomic Notebook Plinth", "Portable Device Pedestal"],
      detail:
        "Ergonomics approved it; Facilities would now like a separate request for the chair.",
    },
    {
      id: "hdmi_cable",
      names: ["HDMI Cable", "Presentation Lifeline", "High-Definition Meeting Rope"],
      detail:
        "The specification requires exactly the connector excluded from every meeting room.",
    },
    {
      id: "webcam_cover",
      names: ["Webcam Cover", "Privacy Shutter", "Camera Confidence Slider"],
      detail:
        "Security calls it privacy control; Support calls it next Monday's broken-camera ticket.",
    },
    {
      id: "headset",
      names: ["Call-Centre Headset", "Acoustic Escalation Harness", "Queue-Compatible Headset"],
      detail:
        "Noise cancellation removes the office but preserves every keyboard strike on the incident bridge.",
    },
    {
      id: "keyboard",
      names: ["Ergonomic Keyboard", "Split-Key Productivity Console", "Approved Typing Appliance"],
      detail:
        "The keys are arranged scientifically and the user has arranged to keep the old keyboard.",
    },
    {
      id: "monitor_arm",
      names: ["Monitor Arm", "Display Articulation Assembly", "Screen Suspension System"],
      detail:
        "It supports every monitor except the unusually heavy model purchased in the previous round.",
    },
    {
      id: "docking_station",
      names: ["Docking Station", "Universal Laptop Harbour", "Desk Connectivity Hub"],
      detail:
        "Universal compatibility is provided through six model-specific firmware packages.",
    },
    {
      id: "cable_labels",
      names: ["Cable Label Pack", "Infrastructure Naming Kit", "Adhesive Governance Roll"],
      detail:
        "Both ends will be labelled as soon as somebody discovers where the other end is.",
    },
    {
      id: "spare_charger",
      names: ["Spare Laptop Charger", "Emergency Power Brick", "Mobile Voltage Reserve"],
      detail:
        "The spare is stored securely in the same locked office as the person who loses chargers.",
    },
    {
      id: "speakerphone",
      names: ["Conference Speakerphone", "Meeting-Room Echo Generator", "Circular Voice Appliance"],
      detail:
        "It identifies the current speaker by illuminating the person who stopped talking.",
    },
    {
      id: "wifi_survey",
      names: ["Wi-Fi Survey", "Wireless Optimism Audit", "Radio Coverage Expedition"],
      detail:
        "The heat map is green everywhere except the desks, meeting rooms, corridors, and building.",
    },
    {
      id: "printer_toner",
      names: ["Printer Toner Reserve", "Emergency Black Powder", "Managed Ink Contingency"],
      detail:
        "The cartridge is genuine, available, and compatible with a printer decommissioned last Thursday.",
    },
    {
      id: "vault_seat",
      names: ["Password Vault Seat", "Credential Storage Licence", "Enterprise Secret Chair"],
      detail:
        "The licence protects one user and the shared account used by the other forty-seven.",
    },
    {
      id: "log_collector",
      names: ["Central Log Collector", "Enterprise Error Bucket", "Observability Intake Node"],
      detail:
        "It centralises every log except the one required to explain why collection stopped.",
    },
    {
      id: "backup_appliance",
      names: ["Backup Appliance", "Restore Confidence Box", "Immutable Data Cupboard"],
      detail:
        "The backup window is eight hours and the approved maintenance window is seven minutes.",
    },
    {
      id: "firewall_review",
      names: ["Firewall Rule Review", "Packet Permission Workshop", "Perimeter Policy Excavation"],
      detail:
        "The review found 900 temporary rules and one permanent owner who left in 2017.",
    },
    {
      id: "rack_shelf",
      names: ["Server Rack Shelf", "Data-Centre Equipment Ledge", "Nineteen-Inch Metal Strategy"],
      detail:
        "The shelf is rated for the server but not the collection of abandoned power supplies above it.",
    },
    {
      id: "cloud_sandbox",
      names: ["Cloud Sandbox", "Disposable Production-Like Account", "Elastic Experiment Zone"],
      detail:
        "It is isolated from production by a naming convention and somebody's best intentions.",
    },
    {
      id: "support_license",
      names: ["Premium Support Licence", "Vendor Sympathy Subscription", "Enterprise Help Entitlement"],
      detail:
        "Priority support guarantees the ticket reaches a senior queue before receiving the same knowledge article.",
    },
  ];

  const procurementThemes = [
    {
      id: "emergency",
      prefix: "Emergency",
      notes: [
        "Requested after the previous unit became shared equipment and disappeared.",
        "The emergency was declared immediately after the regular request spent six weeks in triage.",
        "Same-day approval is available once the seventeen-page urgency form is complete.",
        "The replacement is critical because the broken original is currently holding the door open.",
      ],
    },
    {
      id: "strategic",
      prefix: "Strategic",
      notes: [
        "The business case avoids payback calculations in favour of a large arrow labelled Future State.",
        "It aligns to all six strategic pillars, including the two that contradict each other.",
        "The steering committee approved the vision and deferred the useful accessories.",
        "Benefits will be measured through a dashboard commissioned in a separate program.",
      ],
    },
    {
      id: "interim",
      prefix: "Interim",
      notes: [
        "The temporary solution is funded for twelve years while the permanent option is assessed.",
        "It bridges the gap between the retired product and its repeatedly delayed replacement.",
        "The interim owner has already requested a permanent team and branded stationery.",
        "Removal is scheduled for the quarter after everyone forgets why it exists.",
      ],
    },
    {
      id: "premium",
      prefix: "Premium",
      notes: [
        "Includes 24/7 support in a timezone nobody in the contract can identify.",
        "The premium tier adds a dashboard showing which standard features remain unavailable.",
        "Gold support provides a named account manager and an unnamed technical contact.",
        "The price includes white-glove onboarding; the gloves are a billable add-on.",
      ],
    },
    {
      id: "mandatory",
      prefix: "Mandatory",
      notes: [
        "Nobody requested it, but the steering committee has already selected the colour.",
        "The requirement became mandatory during a meeting attended only by the vendor.",
        "Opting out is supported through an exception process that has not been created.",
        "Compliance begins yesterday, according to the policy published tomorrow.",
      ],
    },
    {
      id: "compliant",
      prefix: "Compliant",
      notes: [
        "It requires a six-week security review and arrives configured with password admin.",
        "The compliance certificate applies to a model with one fewer letter in its name.",
        "Audit approved the controls after Procurement removed the optional evidence package.",
        "The secure configuration guide is available from a public link that requires a shared login.",
      ],
    },
    {
      id: "cloud_ready",
      prefix: "Cloud-Ready",
      notes: [
        "The cloud feature is a PDF explaining how to email the vendor.",
        "Cloud readiness means the invoice is hosted online and scales automatically.",
        "Migration requires an on-premises gateway, two virtual appliances, and faith.",
        "The architecture diagram contains three clouds and four servers hidden behind them.",
      ],
    },
    {
      id: "ai_enabled",
      prefix: "AI-Enabled",
      notes: [
        "AI selects the most expensive option and produces a confident executive summary.",
        "The model was trained on old purchase orders and now recommends fax machines at scale.",
        "Its copilot explains every delay using polished language and no purchase-order number.",
        "Machine learning predicts demand immediately after the request is submitted.",
      ],
    },
    {
      id: "vendor_locked",
      prefix: "Vendor-Locked",
      notes: [
        "Compatible accessories are available exclusively from the account manager's other catalogue.",
        "The connector is standard except for the shape, voltage, protocol, and legal terms.",
        "Export is supported as a screenshot during the final week of the contract.",
        "The vendor calls the lock-in an integrated customer-success ecosystem.",
      ],
    },
    {
      id: "phase_two",
      prefix: "Phase-Two",
      notes: [
        "Phase one delivered the logo, governance model, and reasons phase two is urgent.",
        "This phase restores the features removed to keep phase one on schedule.",
        "Funding depends on benefits already attributed to the unfinished first phase.",
        "The roadmap shows phase three beginning before this purchase arrives.",
      ],
    },
    {
      id: "executive",
      prefix: "Executive",
      notes: [
        "The standard model was rejected because its box did not look sufficiently strategic.",
        "It performs identically to the staff version but includes brushed aluminium and priority loss.",
        "The request bypassed triage by arriving with four people copied from the leadership team.",
        "Delivery must precede the off-site where the business case will be discussed.",
      ],
    },
    {
      id: "year_end",
      prefix: "Year-End",
      notes: [
        "Purchased at 4:58 PM so next year's budget is not punished for this year's restraint.",
        "The requirement appeared when Finance discovered an unspent amount with forty minutes remaining.",
        "Delivery is next quarter, but the budget benefit is emotionally immediate.",
        "Three were needed; twenty were ordered because the remaining funds were divisible by twenty.",
      ],
    },
    {
      id: "sole_source",
      prefix: "Sole-Source",
      notes: [
        "Three quotes came from three resellers owned by the same parent company.",
        "Market testing confirmed only one vendor uses the requirement written by that vendor.",
        "Competition was waived because changing the product name would delay the deadline.",
        "The supplier is uniquely qualified through possession of the current supplier's contract.",
      ],
    },
    {
      id: "pilot",
      prefix: "Pilot",
      notes: [
        "The pilot includes 4,000 users, production data, and no documented exit criteria.",
        "Success is defined as completing the pilot before the annual licence renews.",
        "The small trial requires enterprise support, global rollout pricing, and all departments.",
        "Nobody may call it production until the incident severity reaches one.",
      ],
    },
    {
      id: "enterprise",
      prefix: "Enterprise",
      notes: [
        "The minimum order is 500 because one employee opened a high-priority request.",
        "Enterprise features include SSO, audit logs, and a separate invoice for enabling both.",
        "The licence covers the entire organisation except contractors, subsidiaries, and users.",
        "Volume pricing saves twelve percent by increasing the order six hundred percent.",
      ],
    },
    {
      id: "audit_ready",
      prefix: "Audit-Ready",
      notes: [
        "The asset tag, custody form, and disposal plan cost more than the equipment.",
        "Evidence is retained for seven years in a portal that deletes accounts after ninety days.",
        "Every approval is recorded except the verbal approval that authorised the purchase.",
        "The audit trail begins immediately after the unexplained gap in the audit trail.",
      ],
    },
    {
      id: "zero_trust",
      prefix: "Zero-Trust",
      notes: [
        "Requires four approvals, two shared passwords, and one unsigned spreadsheet.",
        "Every connection is verified except the vendor tunnel marked Do Not Touch.",
        "Least privilege was implemented by giving administrators a smaller shared admin account.",
        "Trust is continuously evaluated once per year during licence renewal.",
      ],
    },
    {
      id: "sustainable",
      prefix: "Sustainable",
      notes: [
        "Arrives in six nested boxes with a forty-page printed sustainability statement.",
        "Carbon savings assume the old unit is recycled rather than moved into the storeroom forever.",
        "The green model uses less power and requires a permanently powered management appliance.",
        "Shipping was consolidated into eleven separate deliveries for operational efficiency.",
      ],
    },
    {
      id: "globally_harmonized",
      prefix: "Globally Harmonised",
      notes: [
        "Procurement saved three percent by selecting the wrong regional power plug everywhere.",
        "One global standard was achieved through seven local exceptions and a travel adapter.",
        "The worldwide model supports every language except the one used by the support team.",
        "Harmonisation moved all regions onto the configuration that worked in none of them.",
      ],
    },
    {
      id: "auto_renewing",
      prefix: "Auto-Renewing",
      notes: [
        "Renews for five years unless cancelled through a portal open one Tuesday per quarter.",
        "The reminder is sent to the original buyer thirty days after automatic renewal.",
        "Cancellation requires the contract number printed only on the cancelled contract.",
        "The introductory discount expires quietly; the relationship remains loudly committed.",
      ],
    },
    {
      id: "retrospective",
      prefix: "Retrospectively Approved",
      notes: [
        "The purchase order was raised after delivery to preserve the established sequence of events.",
        "Approval confirms the purchase would have been approved before it was purchased.",
        "The exception is fully documented in the email asking how the equipment arrived.",
        "Finance has authorised the past while reserving judgement on the present.",
      ],
    },
  ];

  const formatAmount = (value) =>
    window.ticketClickerNumberUnits.formatInline(
      window.ticketClickerNumberUnits.formatParts(value),
    );

  const effectKinds = [
    "click-flat",
    "passive-flat",
    "click-mult",
    "passive-mult",
  ];

  const nameFormats = [
    (theme, item) => `${theme.prefix} ${item}`,
    (theme, item) => `${item} — ${theme.prefix} Edition`,
    (theme, item) => `${theme.prefix} ${item} Package`,
    (theme, item) => `${item} (${theme.prefix} Specification)`,
    (theme, item) => `${theme.prefix} ${item}`,
  ];

  window.ticketClickerProcurementCatalog = Array.from(
    { length: procurementThemes.length * procurementItems.length },
    (_, index) => {
      const themeIndex = index % procurementThemes.length;
      const round = Math.floor(index / procurementThemes.length);
      const itemIndex =
        (round + themeIndex * 8) % procurementItems.length;
      const theme = procurementThemes[themeIndex];
      const item = procurementItems[itemIndex];
      const itemName = item.names[(themeIndex + round) % item.names.length];
      const kind = effectKinds[index % effectKinds.length];
      const isMultiplier = kind.endsWith("mult");
      const amount = isMultiplier
        ? 4.25 + index * 0.18
        : Math.pow(10, 12.5 + index * 0.19);
      const effect =
        kind === "click-flat"
          ? `+${formatAmount(amount)} tickets per click`
          : kind === "passive-flat"
            ? `+${formatAmount(amount)} tickets per second`
            : kind === "click-mult"
              ? `+${Math.round(amount * 100)}% click power`
              : `+${Math.round(amount * 100)}% automation output`;
      const processNote =
        theme.notes[(itemIndex + round) % theme.notes.length];
      const formatName = nameFormats[(itemIndex + themeIndex) % nameFormats.length];

      return {
        id: `proc_${theme.id}_${item.id}`,
        name: formatName(theme, itemName),
        description: `${effect}. ${processNote} ${item.detail}`,
        baseCost: Math.round(2e15 * Math.pow(1.55, index)),
        growth: 1.18 + (index % 9) * 0.01,
        kind,
        amount,
      };
    },
  );
})();
