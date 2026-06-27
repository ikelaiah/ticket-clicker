(() => {
  const STORAGE_KEY = "ticket-clicker-state-v1";
  const MAX_OFFLINE_SECONDS = 60 * 60 * 8;
  const PRIMARY_COMPACT_THRESHOLD = 1000000000000000;
  const numberUnits = window.ticketClickerNumberUnits;

  const coreUpgradeDefs = [
    {
      id: "sticky_notes",
      name: "Color-Coded Sticky Notes",
      description: "+1 ticket per click. The ancient triage system still works.",
      baseCost: 15,
      growth: 1.17,
      kind: "click-flat",
      amount: 1,
    },
    {
      id: "coffee_refill",
      name: "Coffee Refill Rotation",
      description: "+0.4 tickets per second. Morale is infrastructure.",
      baseCost: 25,
      growth: 1.16,
      kind: "passive-flat",
      amount: 0.4,
    },
    {
      id: "password_reset_template",
      name: "Password Reset Template",
      description: "+2 tickets per click. Includes the phrase 'please try again'.",
      baseCost: 40,
      growth: 1.17,
      kind: "click-flat",
      amount: 2,
    },
    {
      id: "spare_hdmi_dongle",
      name: "Spare HDMI Dongle",
      description: "+0.8 tickets per second. Kept in a locked drawer for its protection.",
      baseCost: 65,
      growth: 1.17,
      kind: "passive-flat",
      amount: 0.8,
    },
    {
      id: "keyboard_macro",
      name: "Keyboard Macro",
      description: "+5 tickets per click. One key, seven approvals.",
      baseCost: 90,
      growth: 1.19,
      kind: "click-flat",
      amount: 5,
    },
    {
      id: "helpdesk_intern",
      name: "Helpdesk Intern",
      description: "+2 tickets per second. Pairs well with patience.",
      baseCost: 120,
      growth: 1.18,
      kind: "passive-flat",
      amount: 2,
    },
    {
      id: "rubber_duck",
      name: "Rubber Duck Consultant",
      description: "+5% click power. Bills less than the external consultant.",
      baseCost: 180,
      growth: 1.2,
      kind: "click-mult",
      amount: 0.05,
    },
    {
      id: "knowledge_base",
      name: "Knowledge Base Article",
      description: "+8% click power. Mostly screenshots, somehow useful.",
      baseCost: 260,
      growth: 1.22,
      kind: "click-mult",
      amount: 0.08,
    },
    {
      id: "second_monitor",
      name: "Second Monitor",
      description: "+5 tickets per second. One screen for tickets, one for waiting.",
      baseCost: 380,
      growth: 1.19,
      kind: "passive-flat",
      amount: 5,
    },
    {
      id: "monitoring_bot",
      name: "Monitoring Bot",
      description: "+12 tickets per second. It complains before users do.",
      baseCost: 650,
      growth: 1.2,
      kind: "passive-flat",
      amount: 12,
    },
    {
      id: "label_maker",
      name: "Industrial Label Maker",
      description: "+20 tickets per click. Labels both ends of the cable. Revolutionary.",
      baseCost: 950,
      growth: 1.2,
      kind: "click-flat",
      amount: 20,
    },
    {
      id: "senior_technician",
      name: "Senior Technician",
      description: "+28 tickets per second. Has seen this exact outage since 2009.",
      baseCost: 1400,
      growth: 1.21,
      kind: "passive-flat",
      amount: 28,
    },
    {
      id: "auto_triage",
      name: "Auto-Triage Script",
      description: "+55 tickets per second. Labels everything with confidence.",
      baseCost: 2600,
      growth: 1.22,
      kind: "passive-flat",
      amount: 55,
    },
    {
      id: "runbook_screenshots",
      name: "Runbook With Screenshots",
      description: "+10% automation output. Last updated by someone still employed.",
      baseCost: 4500,
      growth: 1.23,
      kind: "passive-mult",
      amount: 0.1,
    },
    {
      id: "status_page",
      name: "Status Page Update",
      description: "+12% automation output. A banner buys real time.",
      baseCost: 8000,
      growth: 1.24,
      kind: "passive-mult",
      amount: 0.12,
    },
    {
      id: "read_only_friday",
      name: "Read-Only Friday",
      description: "+15% click power. Nobody deploys, therefore nothing breaks.",
      baseCost: 12500,
      growth: 1.24,
      kind: "click-mult",
      amount: 0.15,
    },
    {
      id: "patch_window",
      name: "Overnight Patch Window",
      description: "+300 tickets per second. The office sleeps. You deploy.",
      baseCost: 25000,
      growth: 1.25,
      kind: "passive-flat",
      amount: 300,
    },
    {
      id: "vendor_support",
      name: "Premium Vendor Support",
      description: "+650 tickets per second. Your call is important to their queue.",
      baseCost: 42000,
      growth: 1.25,
      kind: "passive-flat",
      amount: 650,
    },
    {
      id: "change_board",
      name: "Change Advisory Board",
      description: "+18% automation output. Six signatures make every change faster.",
      baseCost: 75000,
      growth: 1.26,
      kind: "passive-mult",
      amount: 0.18,
    },
    {
      id: "crisis_bridge",
      name: "Crisis Bridge",
      description: "+20% automation output. Everyone joins, three people help.",
      baseCost: 120000,
      growth: 1.27,
      kind: "passive-mult",
      amount: 0.2,
    },
    {
      id: "site_reliability_engineer",
      name: "Site Reliability Engineer",
      description: "+1,800 tickets per second. Automates the task, then the team.",
      baseCost: 220000,
      growth: 1.27,
      kind: "passive-flat",
      amount: 1800,
    },
    {
      id: "executive_dashboard",
      name: "Executive Dashboard",
      description: "+25% click power. Turns five red systems into one green percentage.",
      baseCost: 400000,
      growth: 1.28,
      kind: "click-mult",
      amount: 0.25,
    },
    {
      id: "managed_service_provider",
      name: "Managed Service Provider",
      description: "+6,500 tickets per second. Adds a queue in front of your queue.",
      baseCost: 800000,
      growth: 1.29,
      kind: "passive-flat",
      amount: 6500,
    },
    {
      id: "ai_ticket_copilot",
      name: "AI Ticket Copilot",
      description: "+35% automation output. Writes confident summaries of the wrong incident.",
      baseCost: 1500000,
      growth: 1.3,
      kind: "passive-mult",
      amount: 0.35,
    },
    {
      id: "follow_the_sun",
      name: "Follow-the-Sun Helpdesk",
      description: "+28,000 tickets per second. The queue never sleeps. Neither does payroll.",
      baseCost: 3000000,
      growth: 1.31,
      kind: "passive-flat",
      amount: 28000,
    },
    {
      id: "cloud_command_center",
      name: "Cloud Command Center",
      description: "+50% automation output. Mostly screens displaying other screens.",
      baseCost: 7500000,
      growth: 1.32,
      kind: "passive-mult",
      amount: 0.5,
    },
    {
      id: "digital_transformation",
      name: "Digital Transformation Program",
      description: "+120,000 tickets per second. Renames every problem and forms a steering group.",
      baseCost: 15000000,
      growth: 1.34,
      kind: "passive-flat",
      amount: 120000,
    },
    {
      id: "single_pane_of_glass",
      name: "Single Pane of Glass",
      description: "+75% click power. Contains twelve dashboards and requires three logins.",
      baseCost: 40000000,
      growth: 1.35,
      kind: "click-mult",
      amount: 0.75,
    },
    {
      id: "enterprise_architecture",
      name: "Enterprise Architecture",
      description: "+1,000,000 tickets per second. Resolves issues at the conceptual layer.",
      baseCost: 100000000,
      growth: 1.38,
      kind: "passive-flat",
      amount: 1000000,
    },
    {
      id: "cmdb_archaeology",
      name: "CMDB Archaeology Team",
      description: "+1,800,000 tickets per second. Catalogues servers last seen during the Bronze Age.",
      baseCost: 180000000,
      growth: 1.39,
      kind: "passive-flat",
      amount: 1800000,
    },
    {
      id: "itsm_transformation",
      name: "ITSM Transformation",
      description: "+60% automation output. Replaces every form with a longer form.",
      baseCost: 300000000,
      growth: 1.4,
      kind: "passive-mult",
      amount: 0.6,
    },
    {
      id: "global_noc",
      name: "Global Network Operations Center",
      description: "+5,000,000 tickets per second. A wall of screens watches another wall of screens.",
      baseCost: 550000000,
      growth: 1.4,
      kind: "passive-flat",
      amount: 5000000,
    },
    {
      id: "zero_trust_workshop",
      name: "Zero Trust Workshop",
      description: "+90% click power. Nobody trusts the workshop invitation.",
      baseCost: 900000000,
      growth: 1.41,
      kind: "click-mult",
      amount: 0.9,
    },
    {
      id: "observability_platform",
      name: "Observability Platform",
      description: "+14,000,000 tickets per second. Produces enough telemetry to require monitoring.",
      baseCost: 1500000000,
      growth: 1.41,
      kind: "passive-flat",
      amount: 14000000,
    },
    {
      id: "finops_dashboard",
      name: "FinOps Dashboard",
      description: "+80% automation output. Saves money by displaying how much money was not saved.",
      baseCost: 2500000000,
      growth: 1.42,
      kind: "passive-mult",
      amount: 0.8,
    },
    {
      id: "platform_engineering",
      name: "Platform Engineering Team",
      description: "+35,000,000 tickets per second. Builds a paved road with seventeen toll booths.",
      baseCost: 4000000000,
      growth: 1.42,
      kind: "passive-flat",
      amount: 35000000,
    },
    {
      id: "developer_portal",
      name: "Internal Developer Portal",
      description: "+110% click power. One place to find links to all the other places.",
      baseCost: 7000000000,
      growth: 1.43,
      kind: "click-mult",
      amount: 1.1,
    },
    {
      id: "kubernetes_migration",
      name: "Kubernetes Migration",
      description: "+90,000,000 tickets per second. Turns one server problem into 400 pod problems.",
      baseCost: 12000000000,
      growth: 1.43,
      kind: "passive-flat",
      amount: 90000000,
    },
    {
      id: "multi_cloud_strategy",
      name: "Multi-Cloud Strategy",
      description: "+100% automation output. Ensures no invoice can be understood in isolation.",
      baseCost: 20000000000,
      growth: 1.44,
      kind: "passive-mult",
      amount: 1,
    },
    {
      id: "center_of_excellence",
      name: "Center of Excellence",
      description: "+220,000,000 tickets per second. Excellence is mandatory and tracked in PowerPoint.",
      baseCost: 35000000000,
      growth: 1.44,
      kind: "passive-flat",
      amount: 220000000,
    },
    {
      id: "enterprise_data_lake",
      name: "Enterprise Data Lake",
      description: "+140% click power. Nobody knows what is in it, but it is definitely strategic.",
      baseCost: 60000000000,
      growth: 1.45,
      kind: "click-mult",
      amount: 1.4,
    },
    {
      id: "autonomous_remediation",
      name: "Autonomous Remediation",
      description: "+600,000,000 tickets per second. Automatically fixes the incident it automatically caused.",
      baseCost: 100000000000,
      growth: 1.45,
      kind: "passive-flat",
      amount: 600000000,
    },
    {
      id: "quarterly_reorg",
      name: "Quarterly Reorganization",
      description: "+125% automation output. Every ticket gets a new owner and nobody gets a desk.",
      baseCost: 180000000000,
      growth: 1.46,
      kind: "passive-mult",
      amount: 1.25,
    },
    {
      id: "transformation_office",
      name: "Transformation Office",
      description: "+1,500,000,000 tickets per second. Transforms incidents into workstreams.",
      baseCost: 300000000000,
      growth: 1.46,
      kind: "passive-flat",
      amount: 1500000000,
    },
    {
      id: "vendor_consolidation",
      name: "Strategic Vendor Consolidation",
      description: "+180% click power. Replaces twelve vendors with one vendor owning twelve companies.",
      baseCost: 500000000000,
      growth: 1.47,
      kind: "click-mult",
      amount: 1.8,
    },
    {
      id: "serverless_mainframe",
      name: "Serverless Mainframe",
      description: "+4,000,000,000 tickets per second. The server still exists but billing cannot locate it.",
      baseCost: 900000000000,
      growth: 1.47,
      kind: "passive-flat",
      amount: 4000000000,
    },
    {
      id: "digital_twin",
      name: "Digital Twin of IT",
      description: "+150% automation output. The twin is also behind on tickets.",
      baseCost: 1500000000000,
      growth: 1.48,
      kind: "passive-mult",
      amount: 1.5,
    },
    {
      id: "predictive_incidents",
      name: "Predictive Incident Prevention",
      description: "+12,000,000,000 tickets per second. Opens incidents before users know they are unhappy.",
      baseCost: 2500000000000,
      growth: 1.48,
      kind: "passive-flat",
      amount: 12000000000,
    },
    {
      id: "synergy_task_force",
      name: "Synergy Task Force",
      description: "+220% click power. Twelve departments discover they all bought the same tool.",
      baseCost: 4000000000000,
      growth: 1.49,
      kind: "click-mult",
      amount: 2.2,
    },
    {
      id: "quantum_helpdesk",
      name: "Quantum Helpdesk",
      description: "+35,000,000,000 tickets per second. Every ticket is both resolved and awaiting user response.",
      baseCost: 7000000000000,
      growth: 1.49,
      kind: "passive-flat",
      amount: 35000000000,
    },
    {
      id: "unified_everything",
      name: "Unified Everything Platform",
      description: "+200% automation output. Unifies all silos into one larger silo.",
      baseCost: 12000000000000,
      growth: 1.5,
      kind: "passive-mult",
      amount: 2,
    },
    {
      id: "global_transformation",
      name: "Global Transformation Initiative",
      description: "+90,000,000,000 tickets per second. Local problems are now globally standardized.",
      baseCost: 20000000000000,
      growth: 1.5,
      kind: "passive-flat",
      amount: 90000000000,
    },
    {
      id: "ai_executive_sponsor",
      name: "AI Executive Sponsor",
      description: "+300% click power. Attends steering committees at machine speed.",
      baseCost: 35000000000000,
      growth: 1.51,
      kind: "click-mult",
      amount: 3,
    },
    {
      id: "blockchain_ticket_ledger",
      name: "Blockchain Ticket Ledger",
      description: "+250,000,000,000 tickets per second. The unresolved ticket is now immutable.",
      baseCost: 60000000000000,
      growth: 1.51,
      kind: "passive-flat",
      amount: 250000000000,
    },
    {
      id: "metaverse_war_room",
      name: "Metaverse War Room",
      description: "+250% automation output. The outage now has spatial audio and virtual chairs.",
      baseCost: 100000000000000,
      growth: 1.52,
      kind: "passive-mult",
      amount: 2.5,
    },
    {
      id: "self_healing_org_chart",
      name: "Self-Healing Organization Chart",
      description: "+700,000,000,000 tickets per second. Automatically assigns blame to the nearest vacancy.",
      baseCost: 180000000000000,
      growth: 1.52,
      kind: "passive-flat",
      amount: 700000000000,
    },
    {
      id: "infinite_budget_exception",
      name: "Infinite Budget Exception",
      description: "+400% click power. Approved once Finance stopped reading the amount.",
      baseCost: 300000000000000,
      growth: 1.53,
      kind: "click-mult",
      amount: 4,
    },
    {
      id: "universal_service_desk",
      name: "Universal Service Desk",
      description: "+2,000,000,000,000 tickets per second. Supports every device except the one you own.",
      baseCost: 600000000000000,
      growth: 1.53,
      kind: "passive-flat",
      amount: 2000000000000,
    },
    {
      id: "heat_death_runbook",
      name: "Heat Death Runbook",
      description: "+350% automation output. Final step: wait for all systems to reach equilibrium.",
      baseCost: 1000000000000000,
      growth: 1.54,
      kind: "passive-mult",
      amount: 3.5,
    },
  ];

  const upgradeDefs = [
    ...coreUpgradeDefs,
    ...(window.ticketClickerProcurementCatalog || []),
  ];
  const OFFICE_TIERS = [
    {
      id: "service-desk",
      name: "Service Desk Corner",
      requirement: 0,
      description: "One desk, one queue, no approved plant.",
    },
    {
      id: "operations-bay",
      name: "Operations Bay",
      requirement: 5,
      description: "Enough equipment to look intentionally organised.",
    },
    {
      id: "support-floor",
      name: "Regional Support Floor",
      requirement: 25,
      description: "A real team, a bigger queue, and several meeting rooms.",
    },
    {
      id: "command-centre",
      name: "Network Command Centre",
      requirement: 100,
      description: "Wallboards, blinking racks, and executive visibility.",
    },
    {
      id: "global-campus",
      name: "Global Operations Campus",
      requirement: 250,
      description: "The queue now has its own postcode.",
    },
    {
      id: "autonomous-office",
      name: "Autonomous Office",
      requirement: upgradeDefs.length,
      description: "Every procurement installed. The office can practically run itself.",
    },
  ];

  const coreAchievementDefs = [
    {
      id: "first_close",
      emoji: "🎫",
      name: "First Close",
      description: "Resolve 1 ticket.",
      category: "tickets",
      isUnlocked: () => state.totalResolved >= 1,
    },
    {
      id: "procurement_started",
      emoji: "🛒",
      name: "Procurement Started",
      description: "Buy your first upgrade.",
      category: "procurement",
      isUnlocked: () => Object.values(state.upgrades).some((count) => count > 0),
    },
    {
      id: "queue_tamer",
      emoji: "🏅",
      name: "Queue Tamer",
      description: "Resolve 100 total tickets.",
      category: "tickets",
      isUnlocked: () => state.totalResolved >= 100,
    },
    {
      id: "first_automation",
      emoji: "🤖",
      name: "First Automation",
      description: "Reach 10 tickets per second.",
      category: "automation",
      isUnlocked: () => getTicketsPerSecond() >= 10,
    },
    {
      id: "inbox_zeroish",
      emoji: "📭",
      name: "Inbox Zero-ish",
      description: "Clear the open queue after closing 50 tickets.",
      category: "operations",
      isUnlocked: () => state.totalResolved >= 50 && state.openTickets < 1,
    },
    {
      id: "incident_commander",
      emoji: "🚨",
      name: "Incident Commander",
      description: "Resolve 1,000 total tickets.",
      category: "tickets",
      isUnlocked: () => state.totalResolved >= 1000,
    },
    {
      id: "script_whisperer",
      emoji: "📜",
      name: "Script Whisperer",
      description: "Own 5 auto-triage scripts.",
      category: "automation",
      isUnlocked: () => owned("auto_triage") >= 5,
    },
    {
      id: "major_release",
      emoji: "🏆",
      name: "Major Release",
      description: "Resolve 25,000 total tickets.",
      category: "tickets",
      isUnlocked: () => state.totalResolved >= 25000,
    },
  ];
  const catalogAchievementDefs = (window.ticketClickerReputationCatalog || []).map(
    (achievement) => ({
      ...achievement,
      isUnlocked: () => getAchievementMetric(achievement.metric) >= achievement.target,
    }),
  );
  const achievementDefs = [...coreAchievementDefs, ...catalogAchievementDefs];

  const realLifeIncidentDefs = [
    // Cybersecurity (23)
    ["MFA is sending the approval prompt to the phone left at home.", 18, 0],
    ["A phishing report was submitted for the security awareness newsletter.", 24, 20],
    ["Someone pasted Password1! into a screenshot to prove the password was correct.", 31, 50],
    ["Endpoint protection quarantined payroll five minutes before payday.", 46, 120],
    ["The vulnerability scanner discovered a critical vulnerability in the vulnerability scanner.", 52, 180],
    ["The penetration test locked out the CEO and called it proof of concept.", 58, 260],
    ["The certificate renewal email was caught by the company's anti-phishing filter.", 63, 350],
    ["The SIEM duplicated every alert during daylight saving time for compliance.", 71, 500],
    ["A firewall hardening change successfully blocked the Security Operations Center.", 79, 700],
    ["An ex-employee account still owns the production automation because it has seniority.", 88, 950],
    ["A secret was removed from the public repository but survived in fourteen forks.", 97, 1300],
    ["Data Loss Prevention blocked the Data Loss Prevention policy document.", 106, 1800],
    ["Conditional Access requires the office network to access VPN and VPN to access the office network.", 118, 2500],
    ["The security agent update uses 98% CPU to protect the laptop from productivity.", 132, 3400],
    ["The phishing simulation redirected users to the real vendor payment portal.", 149, 4700],
    ["Impossible Travel detected an employee in the office and the office kitchen.", 167, 6500],
    ["The privileged-access approver is also the requester, reviewer, and emergency contact.", 186, 9000],
    ["Cyber insurance requested the network diagram. The latest copy is a 2016 Visio file.", 210, 12500],
    ["The ransomware drill encrypted the ransomware drill documentation.", 238, 17500],
    ["Single sign-on is down. The support page says to sign in and contact an administrator.", 271, 25000],
    ["The SOC opened a critical incident because production is using port 443.", 308, 36000],
    ["The vulnerability exception expired three minutes before the approved patch window.", 351, 52000],
    ["The zero-day mitigation disabled the business. Security reports zero active threats.", 402, 75000],

    // General IT - software installation and switching things on (23)
    ["The laptop will not start because the user has been pressing the monitor power button.", 9, 0],
    ["The installation request says only 'the blue icon from my old computer'.", 12, 0],
    ["The software is already installed, but its desktop shortcut is behind another shortcut.", 14, 0],
    ["The 32-bit installer was downloaded for a 64-bit system from a 16-bit website.", 17, 10],
    ["The user rebooted the laptop by closing the lid and counting to ten.", 20, 20],
    ["The docking station has no power because its power button looked decorative.", 23, 35],
    ["The USB-C cable supports charging, data, optimism, but not video.", 27, 50],
    ["The keyboard is connected to the monitor's USB hub. The monitor is disconnected.", 30, 75],
    ["Adobe requested administrator rights during the CEO's board presentation.", 34, 100],
    ["Every software licence is assigned to former employees who remain digitally productive.", 39, 140],
    ["The requester attached a screenshot of the software instead of its name.", 43, 190],
    ["The browser is zoomed to 500%. The website is apparently missing most of its buttons.", 48, 250],
    ["Every file opens in Paint after an ambitious Default Apps experiment.", 54, 330],
    ["The installer sat at 99% for two minutes, so the user cancelled it six times.", 60, 430],
    ["The camera is broken. Its physical privacy shutter is performing flawlessly.", 67, 560],
    ["Audio is routed to a Bluetooth headset currently commuting home.", 75, 740],
    ["The external monitor says No Signal because no signal cable was ordered.", 84, 980],
    ["The user clicked the first Download button. It belonged to an advertisement.", 94, 1300],
    ["Two versions of Teams are installed and have begun fighting for the microphone.", 105, 1750],
    ["The application needs a restart. Forty-seven unsaved spreadsheets have vetoed it.", 118, 2400],
    ["Airplane mode is on. The laptop has not achieved flight.", 132, 3300],
    ["The software requires an account, so the user created a personal one called CorporateAdmin.", 148, 4600],
    ["The installer vanished from the shared drive after antivirus correctly identified its personality.", 166, 6500],

    // General IT - operating-system support (22)
    ["Windows 11 moved the Start button. A missing-person ticket has been opened.", 16, 0],
    ["The macOS upgrade removed support for the one application Finance purchased forever.", 24, 30],
    ["The operating system is end-of-life, but the business application says it is just getting started.", 32, 80],
    ["The laptop changed time zone and accepted six meetings yesterday.", 39, 140],
    ["The keyboard layout is now Dvorak. Nobody admits knowing what Dvorak is.", 45, 220],
    ["A language pack changed half the operating system to Swedish and left Settings in English.", 52, 320],
    ["The disk is full. The Recycle Bin has been preserving 200 GB of corporate history.", 61, 460],
    ["Windows signed the user into a temporary profile and described it as a feature.", 70, 650],
    ["The roaming profile is downloading a 48 GB desktop before displaying the login screen.", 81, 900],
    ["The BitLocker recovery key is stored in a document on the BitLocker-locked laptop.", 93, 1250],
    ["Safe Mode has no network access. The user reports that safety broke the internet.", 107, 1700],
    ["The update rollback rolled back into the update that caused the rollback.", 123, 2350],
    ["The system date is 1970. Every certificate is from the future and therefore suspicious.", 141, 3200],
    ["High Contrast mode was enabled accidentally and reported as a cyberattack.", 162, 4400],
    ["Display scaling is set to 300%. The taskbar now requires horizontal scrolling.", 186, 6100],
    ["Two browser policies are changing the default browser back and forth every login.", 214, 8500],
    ["The laptop sleeps after one minute to meet its aggressive work-life balance policy.", 246, 12000],
    ["BitLocker requested recovery after the approved motherboard replacement nobody documented.", 283, 17000],
    ["The Windows activation watermark was reported as persistent malware.", 325, 24000],
    ["The old Linux kernel does not support the new Wi-Fi adapter. The old adapter supports retirement.", 374, 34000],
    ["Automatic updates restarted the public kiosk during the mayor's speech.", 430, 49000],
    ["The user postponed updates for 400 days and now objects to the estimated completion time.", 495, 70000],

    // Integration - software and data (22)
    ["The API returned HTTP 200 with a body saying everything failed.", 27, 100],
    ["customer_id is an integer in one system, a UUID in another, and a feeling in the third.", 35, 180],
    ["The vendor changed the date format on Friday and called it backward compatible.", 43, 280],
    ["The production webhook still points to the sandbox that was retired last quarter.", 51, 420],
    ["The integration account password expired exactly as the nightly sync began.", 60, 600],
    ["The field mapping sends surname into country and country into Additional Notes.", 70, 850],
    ["One system exports commas, another expects semicolons, and Excel has chosen tabs.", 82, 1150],
    ["UTC was converted to local time twice, scheduling every appointment tomorrow yesterday.", 95, 1550],
    ["A database null became the string 'null' and is now a valued customer.", 110, 2100],
    ["The undocumented API rate limit is seventeen requests per minute and one apology.", 127, 2900],
    ["Pagination stops after 100 records because page two is considered premium functionality.", 147, 4000],
    ["The API documentation describes version one, which the API denies ever existing.", 170, 5600],
    ["The production OAuth callback redirects to localhost and waits patiently.", 196, 7800],
    ["Middleware retried the payment request until the customer owned twelve subscriptions.", 226, 11000],
    ["The schema added a mandatory field described in release notes as optional.", 261, 15500],
    ["The partner uploaded the .done file before uploading the file that was done.", 301, 22000],
    ["One poison message has been reprocessed 40,000 times and now has tenure.", 347, 31000],
    ["The EDI partner sent production data with Test equals false and called it testing.", 400, 44000],
    ["The CRM sync interpreted deletion as a strongly worded update.", 462, 63000],
    ["The integration owner is a distribution list with zero members and unlimited confidence.", 533, 90000],
    ["The certificate chain is missing the intermediate certificate and emotional support.", 615, 130000],
    ["The data contract was approved shortly after the breaking change reached production.", 710, 190000],

    // Infrastructure - networking (22)
    ["A network cable formed a loop under a desk and discovered Spanning Tree personally.", 25, 80],
    ["The DHCP pool is full of phones that visited the office once in 2021.", 33, 150],
    ["DNS cached the old address and remains loyal to it.", 41, 240],
    ["NAC disabled the printer port because the printer was moved two desks left.", 50, 360],
    ["The Wi-Fi access point is mounted inside a locked metal cabinet for security.", 59, 520],
    ["The conference-room SSID contains a typo that has become company branding.", 69, 740],
    ["Split tunnelling routed the public internet through the data centre and split morale.", 81, 1050],
    ["An MTU mismatch affects only large email attachments and executive patience.", 94, 1450],
    ["Both ends of the fibre are labelled 'other end'.", 109, 2000],
    ["The load balancer reports healthy because its health check serves a static smiley face.", 126, 2800],
    ["The BGP announcement selected a scenic international route.", 146, 3900],
    ["The proxy configuration points to a server retired with full honours.", 169, 5500],
    ["The guest Wi-Fi password is printed on the wall and changes every morning.", 195, 7700],
    ["The PoE budget is exceeded, so the security cameras blink in shifts.", 225, 10800],
    ["The Spanning Tree root is a twenty-dollar unmanaged switch under Reception.", 260, 15200],
    ["The network diagram contains one cloud, three question marks, and Dave's phone number.", 300, 21500],
    ["The CEO's printer has the same IP address as the finance database.", 347, 30500],
    ["Ping works, so Networking has declared the application healthy.", 401, 43500],
    ["The wired network is presenting a captive portal intended for hotel guests.", 463, 62000],
    ["IPv6 works perfectly. The application has hardcoded IPv4 since 2006.", 535, 89000],
    ["SD-WAN selected the expensive backup link because it enjoys premium connectivity.", 618, 128000],
    ["Network monitoring generated enough polling traffic to trigger network monitoring.", 714, 185000],

    // Infrastructure - Windows (22)
    ["Group Policy takes 90 minutes to apply and gpupdate immediately says success.", 29, 100],
    ["Active Directory replication says the user both exists and does not exist.", 38, 190],
    ["The service-account password was rotated everywhere except the service.", 47, 300],
    ["A printer driver crashed the print spooler in the name of compatibility.", 57, 450],
    ["WSUS approved an update superseded during the previous financial year.", 68, 650],
    ["The RDP certificate is valid for a hostname last used before the merger.", 80, 920],
    ["Share permissions allow Everyone; NTFS permissions allow nobody. Governance is balanced.", 94, 1300],
    ["DFS sent the Sydney office to the London file server for lower latency.", 110, 1800],
    ["The cluster failed over during backup and failed back during the incident call.", 128, 2500],
    ["A domain controller is taking time from the break-room microwave.", 149, 3500],
    ["The scheduled task runs only when the user is logged in and away from their desk.", 173, 4900],
    ["The IIS application-pool identity locked itself out while checking its own password.", 201, 6900],
    ["Windows Service Recovery restarts the broken service every minute with admirable commitment.", 233, 9700],
    ["The registry key was deployed successfully to the wrong registry hive.", 270, 13700],
    ["A temporary Hyper-V checkpoint has become permanent infrastructure.", 313, 19400],
    ["The certificate template permits enrolment while the enrolment policy forbids permission.", 363, 27500],
    ["The failover-cluster witness lives on a share decommissioned last Tuesday.", 421, 39000],
    ["SMB signing broke the scanner purchased when fax was considered modern.", 488, 55500],
    ["The event log overwrote the incident before the incident could read the event log.", 566, 79000],
    ["A Group Policy mapped the shared drive to itself recursively.", 656, 113000],
    ["Remote Desktop licensing ended its grace period at 4:58 PM on Friday.", 761, 162000],
    ["Windows Update says everything is current while listing 86 missing updates.", 883, 235000],

    // Infrastructure - Linux and macOS (22)
    ["chmod -R 777 fixed the problem and created several new departments.", 28, 100],
    ["The disk is full after deleted logs remained open and emotionally attached.", 37, 180],
    ["The cron job works manually because cron has never heard of the environment.", 46, 290],
    ["A sudoers typo removed sudo access from the person needed to fix sudoers.", 56, 430],
    ["Production is case-sensitive. Development was raised to be more forgiving.", 67, 620],
    ["The filesystem has free space but no free inodes, a distinction nobody budgeted for.", 79, 880],
    ["The systemd service starts after networking but before DNS has accepted networking.", 93, 1230],
    ["SSH rejected the private key for being too publicly confident.", 108, 1700],
    ["The kernel was updated six months ago and is waiting for a ceremonial reboot.", 126, 2400],
    ["Homebrew upgraded Python and downgraded the team's afternoon.", 147, 3350],
    ["macOS Privacy reset microphone permissions during the company webcast.", 171, 4700],
    ["The launchd plist is valid XML describing an invalid universe.", 199, 6600],
    ["The NFS stale file handle is neither fresh nor particularly helpful.", 231, 9300],
    ["SELinux was disabled temporarily in 2018 and has remained very cooperative.", 268, 13100],
    ["The root filesystem became read-only to avoid further management decisions.", 311, 18500],
    ["A shell script has Windows line endings and a bad interpreter with excellent intentions.", 361, 26200],
    ["The certificate is trusted by the system keychain and distrusted by the application personally.", 419, 37200],
    ["The Linux server is named localhost in the CMDB and production everywhere else.", 486, 53000],
    ["Swap was disabled as an optimisation. Memory has submitted a formal complaint.", 564, 75500],
    ["FileVault recovery-key escrow has been pending for 900 days and remains optimistic.", 654, 108000],
    ["The container runs as root because permissions were delaying the sprint.", 759, 155000],
    ["Ansible changed exactly one server because its inventory hostname had a silent typo.", 881, 225000],

    // Data engineering and pipelines (22)
    ["The pipeline is green and produced zero rows with exceptional reliability.", 30, 120],
    ["Schema inference treated phone numbers as integers and removed their leading dignity.", 40, 220],
    ["Late-arriving data arrived after the dashboard had already disappointed management.", 50, 350],
    ["The backfill duplicated all historical data to ensure nothing was missed.", 61, 520],
    ["The date partition uses UTC and has confidently stored today under yesterday.", 73, 750],
    ["dbt tests were disabled to make the deployment pass its tests.", 87, 1050],
    ["The Spark job requested more memory than exists in the cloud region.", 103, 1480],
    ["The Airflow DAG remained paused after successful maintenance on the DAG.", 121, 2050],
    ["The Kafka consumer reset to earliest and is currently reading the company's childhood.", 142, 2850],
    ["A SELECT star exhausted the warehouse credits and discovered every column.", 166, 4000],
    ["Production PII was copied into the development sample because realism matters.", 194, 5600],
    ["The object-storage lifecycle deleted the source file one minute before ingestion.", 226, 7900],
    ["The revenue column is named revenue_final2_REAL_USE_THIS.", 264, 11100],
    ["CDC interpreted TRUNCATE as a request to synchronise the apocalypse.", 308, 15700],
    ["The ETL pipeline has the fiscal year hardcoded and is emotionally still in 2023.", 359, 22200],
    ["A notebook result became production because the chart looked convincing.", 418, 31500],
    ["The BI extract refreshed successfully from an empty staging table.", 487, 44800],
    ["The data-quality rule rejects real values and accepts null as perfectly clean.", 567, 64000],
    ["Secret rotation broke JDBC and improved credential freshness dramatically.", 660, 91500],
    ["The pipeline owner is a service account that left the company.", 768, 131000],
    ["The incremental-load watermark is dated next Tuesday and refuses to look back.", 893, 188000],
    ["Bronze, silver, and gold layers all contain the same Parquet file with different confidence.", 1038, 272000],

    // Software development, bugs, and DevOps (22)
    ["The bug cannot be reproduced until the developer joins the screen share.", 26, 80],
    ["It works on my machine. The machine has been proposed for production.", 35, 160],
    ["The feature flag is inverted, so Off means adventurous.", 44, 260],
    ["The unit test asserts that true is still true and passes confidently.", 54, 400],
    ["CI restored an old binary from cache and congratulated the new source code.", 65, 580],
    ["The merge conflict was resolved by deleting both versions and choosing peace.", 77, 820],
    ["The hotfix branch came from the wrong release and fixed a different customer.", 91, 1150],
    ["A breaking major release shipped as a patch because the number looked friendlier.", 106, 1600],
    ["The dependency update installed 1,400 packages and one left-pad philosophy.", 124, 2250],
    ["Lint passed. The code does not compile, but it is formatted beautifully.", 145, 3150],
    ["The health endpoint says OK while the database quietly leaves the building.", 169, 4400],
    ["Retry without backoff transformed one failed request into an internal DDoS service.", 197, 6200],
    ["Debug logging filled the disk while documenting why the disk was filling.", 230, 8700],
    ["The exception was swallowed and returned an empty success response.", 268, 12300],
    ["The frontend bug appears only at 1366 by 768 with 125% scaling and Finance watching.", 312, 17400],
    ["The mobile-app certificate expired while the app-store reviewer was away for the weekend.", 363, 24700],
    ["Terraform plans to recreate production to correct one tag.", 423, 35100],
    ["The Helm value contains a typo that was silently accepted as innovation.", 492, 50000],
    ["A secret was printed to CI logs and masked everywhere except the useful part.", 572, 71500],
    ["Blue-green deployment completed with both environments configured blue.", 665, 102000],
    ["The feature works only for administrators because every developer is an administrator.", 773, 147000],
    ["Rollback deployed the same broken artifact because latest is apparently immutable.", 899, 212000],
  ].map(([label, amount, minResolved]) => ({
    label,
    amount,
    minResolved,
    category: classifyIncident(label),
  }));

  const incidentDefs = [
    ...realLifeIncidentDefs,
    ...(window.ticketClickerIncidentCatalog || []),
    {
      label: "A printer spooler made a comeback. Nobody invited it.",
      amount: 12,
      minResolved: 0,
    },
    {
      label: "The conference room TV is on HDMI 3. It needs to be on HDMI 2.",
      amount: 9,
      minResolved: 0,
    },
    {
      label: "A mouse stopped working. It was upside down.",
      amount: 7,
      minResolved: 0,
    },
    {
      label: "The wireless keyboard needs new batteries. It is wired.",
      amount: 8,
      minResolved: 0,
    },
    {
      label: "A user cannot find the Any key. Procurement has been notified.",
      amount: 10,
      minResolved: 0,
    },
    {
      label: "Someone opened a CSV in Notepad and declared the data corrupted.",
      amount: 52,
      minResolved: 0,
    },
    {
      label: "The caps lock light is on. This has been escalated to Security.",
      amount: 11,
      minResolved: 0,
    },
    {
      label: "A monitor is black because the brightness is set to 'cave'.",
      amount: 13,
      minResolved: 0,
    },
    {
      label: "The new starter arrived. Their onboarding ticket arrives tomorrow.",
      amount: 18,
      minResolved: 0,
    },
    {
      label: "The office printer says PC LOAD LETTER. Nobody speaks printer.",
      amount: 19,
      minResolved: 15,
    },
    {
      label: "A user submitted 'computer weird' with no screenshot and urgent priority.",
      amount: 21,
      minResolved: 25,
    },
    {
      label: "A screenshot was pasted into Word, printed, scanned, and attached sideways.",
      amount: 23,
      minResolved: 25,
    },
    {
      label: "The password is definitely correct. It is being typed into the username field.",
      amount: 25,
      minResolved: 35,
    },
    {
      label: "The VPN forgot what DNS means. DNS denies knowing the VPN.",
      amount: 28,
      minResolved: 40,
    },
    {
      label: "Someone unplugged the access point to charge a vape.",
      amount: 29,
      minResolved: 50,
    },
    {
      label: "The all-hands link opens last year's all-hands.",
      amount: 31,
      minResolved: 70,
    },
    {
      label: "The meeting room is double-booked by two meetings about collaboration.",
      amount: 33,
      minResolved: 80,
    },
    {
      label: "Teams says everyone is Away. Management has opened an investigation.",
      amount: 36,
      minResolved: 110,
    },
    {
      label: "A calendar invite was sent for 3 AM. Attendance is mandatory.",
      amount: 38,
      minResolved: 130,
    },
    {
      label: "The CEO wants their deleted email back. It was deleted in 2019.",
      amount: 41,
      minResolved: 150,
    },
    {
      label: "A phishing simulation used the CEO's actual name and real credit card.",
      amount: 44,
      minResolved: 180,
    },
    {
      label: "Finance renamed Final.xlsx to Final_FINAL_v7_USE_THIS_ONE.xlsx.",
      amount: 47,
      minResolved: 210,
    },
    {
      label: "MFA was denied seventeen times, then the suspicious one was approved.",
      amount: 52,
      minResolved: 260,
    },
    {
      label: "A password manager master password is stored in the password manager.",
      amount: 54,
      minResolved: 300,
    },
    {
      label: "Someone moved the Shared Folder into the Shared Folder.",
      amount: 58,
      minResolved: 380,
    },
    {
      label: "The shared drive is full of shortcuts pointing to other shortcuts.",
      amount: 61,
      minResolved: 430,
    },
    {
      label: "The smart fridge joined the production VLAN.",
      amount: 64,
      minResolved: 520,
    },
    {
      label: "The coffee machine requested a domain administrator account.",
      amount: 67,
      minResolved: 610,
    },
    {
      label: "A desk fan is broadcasting an unsecured Wi-Fi network.",
      amount: 71,
      minResolved: 720,
    },
    {
      label: "The build server ran out of disk while generating a low-disk alert.",
      amount: 76,
      minResolved: 900,
    },
    {
      label: "The deployment pipeline is green because the tests never started.",
      amount: 79,
      minResolved: 1050,
    },
    {
      label: "A laptop began a 47-minute update thirty seconds before the presentation.",
      amount: 83,
      minResolved: 1200,
    },
    {
      label: "The demo environment remembered it is actually production.",
      amount: 87,
      minResolved: 1400,
    },
    {
      label: "The monitoring system reports that the monitoring system is down.",
      amount: 92,
      minResolved: 1700,
    },
    {
      label: "The alerting system sent 8,000 alerts about excessive alert volume.",
      amount: 98,
      minResolved: 1950,
    },
    {
      label: "The SSL certificate expired. Its owner left the company in 2022.",
      amount: 108,
      minResolved: 2400,
    },
    {
      label: "A wildcard certificate has become emotionally unavailable.",
      amount: 114,
      minResolved: 2800,
    },
    {
      label: "The firewall rule says ANY to ANY. Security calls it 'temporary'.",
      amount: 121,
      minResolved: 3300,
    },
    {
      label: "Someone replied-all to the outage thread asking not to reply-all.",
      amount: 130,
      minResolved: 4000,
    },
    {
      label: "The incident bridge has 94 participants and one person who knows the system.",
      amount: 142,
      minResolved: 4800,
    },
    {
      label: "The Excel database reached its natural predator: row 1,048,577.",
      amount: 155,
      minResolved: 6000,
    },
    {
      label: "The business-critical spreadsheet contains a macro named DO_NOT_CLICK.",
      amount: 163,
      minResolved: 6900,
    },
    {
      label: "Production was fixed by a reboot. Nobody knows what rebooted.",
      amount: 180,
      minResolved: 8500,
    },
    {
      label: "A senior engineer whispered 'that should be impossible' near production.",
      amount: 192,
      minResolved: 9800,
    },
    {
      label: "The backup succeeded. The restore requires a tape labeled 'DO NOT USE'.",
      amount: 225,
      minResolved: 12000,
    },
    {
      label: "The disaster recovery plan is stored on the server currently on fire.",
      amount: 244,
      minResolved: 14500,
    },
    {
      label: "An AI-generated regex classified every employee as a printer.",
      amount: 280,
      minResolved: 18000,
    },
    {
      label: "The chatbot reset its own password and refuses to disclose it.",
      amount: 305,
      minResolved: 21500,
    },
    {
      label: "The status page is down. Status is currently unknown.",
      amount: 340,
      minResolved: 26000,
    },
    {
      label: "The root cause document lists the root cause as 'root cause pending'.",
      amount: 372,
      minResolved: 32000,
    },
    {
      label: "The emergency change needs an emergency meeting to approve the emergency.",
      amount: 420,
      minResolved: 40000,
    },
    {
      label: "The change freeze was changed during the change freeze.",
      amount: 465,
      minResolved: 50000,
    },
    {
      label: "Someone found the legacy server. It found them back.",
      amount: 550,
      minResolved: 65000,
    },
    {
      label: "The legacy server only responds to a username nobody remembers and a ritual nobody documented.",
      amount: 640,
      minResolved: 80000,
    },
    {
      label: "The mainframe printed a warning in Latin. Legal is reviewing it.",
      amount: 760,
      minResolved: 100000,
    },
    {
      label: "An undocumented cron job achieved sentience and requested annual leave.",
      amount: 920,
      minResolved: 140000,
    },
    {
      label: "The cloud has become on-premises due to weather.",
      amount: 1150,
      minResolved: 200000,
    },
    {
      label: "Production has forked into two timelines. Both are billing customers.",
      amount: 1500,
      minResolved: 300000,
    },
    {
      label: "A USB plug was inserted incorrectly twice. The third attempt changed nothing.",
      amount: 10,
      minResolved: 0,
    },
    {
      label: "A browser has 94 open tabs and one of them is making music.",
      amount: 16,
      minResolved: 0,
    },
    {
      label: "The laptop will not wake up. Its lid is closed and it would like that respected.",
      amount: 12,
      minResolved: 0,
    },
    {
      label: "The ticket says ASAP because the requester is going to lunch.",
      amount: 20,
      minResolved: 20,
    },
    {
      label: "The internet is slow while someone streams four security cameras in 4K.",
      amount: 24,
      minResolved: 30,
    },
    {
      label: "A distribution list contains itself. Email has achieved recursion.",
      amount: 32,
      minResolved: 80,
    },
    {
      label: "The printer has A4 paper, wants Letter paper, and rejects diplomacy.",
      amount: 35,
      minResolved: 100,
    },
    {
      label: "A shared mailbox rule forwards every message back to the shared mailbox.",
      amount: 43,
      minResolved: 160,
    },
    {
      label: "The password expired halfway through the password reset.",
      amount: 49,
      minResolved: 250,
    },
    {
      label: "The meeting-room microphone is muted by a physical switch last seen in 2017.",
      amount: 56,
      minResolved: 400,
    },
    {
      label: "An intern deleted the test database. It was production wearing a fake moustache.",
      amount: 69,
      minResolved: 700,
    },
    {
      label: "Branch protection is protecting the branch nobody uses.",
      amount: 81,
      minResolved: 1000,
    },
    {
      label: "The deployment tool requires Java 6 and an apology.",
      amount: 89,
      minResolved: 1400,
    },
    {
      label: "Monitoring alerts were routed to Junk because they looked suspicious.",
      amount: 103,
      minResolved: 2000,
    },
    {
      label: "The emergency DNS change has a TTL of thirty days.",
      amount: 119,
      minResolved: 3000,
    },
    {
      label: "Asset inventory lists the break-room microwave as a perimeter firewall.",
      amount: 137,
      minResolved: 4500,
    },
    {
      label: "The security scanner has locked out every account, including its own.",
      amount: 159,
      minResolved: 6500,
    },
    {
      label: "The Change Advisory Board approved the deployment three hours after it finished.",
      amount: 188,
      minResolved: 9000,
    },
    {
      label: "Vendor support downgraded severity because the workaround is 'stop using the system'.",
      amount: 231,
      minResolved: 13000,
    },
    {
      label: "The cloud invoice contains a seven-figure line item named 'Other'.",
      amount: 275,
      minResolved: 18000,
    },
    {
      label: "The data lake has become a data swamp. Facilities reports mosquitoes.",
      amount: 332,
      minResolved: 26000,
    },
    {
      label: "The load balancer distributes traffic according to personal preference.",
      amount: 398,
      minResolved: 36000,
    },
    {
      label: "Single sign-on now requires four separate sign-ons.",
      amount: 477,
      minResolved: 50000,
    },
    {
      label: "The company now has more microservices than employees.",
      amount: 568,
      minResolved: 70000,
    },
    {
      label: "AI wrote a successful postmortem for the outage that is still happening.",
      amount: 681,
      minResolved: 100000,
    },
    {
      label: "The Kubernetes pods have unionized and demand predictable scheduling.",
      amount: 816,
      minResolved: 150000,
    },
    {
      label: "The quantum server may be down. Observing it would invalidate the support contract.",
      amount: 978,
      minResolved: 220000,
    },
    {
      label: "The organization chart contains a circular reporting dependency.",
      amount: 1174,
      minResolved: 320000,
    },
    {
      label: "The time server jumped ahead and closed tickets before they were opened.",
      amount: 1409,
      minResolved: 450000,
    },
    {
      label: "The ticket queue has opened a critical ticket about the size of the ticket queue.",
      amount: 1691,
      minResolved: 650000,
    },
  ];

  const milestoneQueue = [50, 100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000];
  const buffDefs = [
    {
      id: "coffee_rush",
      name: "Coffee Rush",
      description: "Click power +50%",
      duration: 36000,
      effects: { click: 1.5 },
    },
    {
      id: "change_freeze",
      name: "Actual Change Freeze",
      description: "Incoming tickets -45%",
      duration: 48000,
      effects: { incoming: 0.55 },
    },
    {
      id: "vendor_escalation",
      name: "Vendor Escalation",
      description: "Automation output +40%",
      duration: 42000,
      effects: { passive: 1.4 },
    },
    {
      id: "read_only_friday",
      name: "Read-Only Friday",
      description: "All resolution +25%",
      duration: 60000,
      effects: { click: 1.25, passive: 1.25 },
    },
  ];
  const queueCategoryDefs = [
    { id: "service_desk", name: "Service Desk", group: "Service Desk", color: "#9bc57f", weight: 1.3 },
    { id: "general_it", name: "General IT", group: "Service Desk", color: "#58c6a7", weight: 1.6 },
    { id: "hardware_av", name: "Hardware and AV", group: "Service Desk", color: "#d9a441", weight: 1 },
    { id: "printers", name: "Printers", group: "Service Desk", color: "#a6b0bf", weight: 0.8 },
    { id: "edumate", name: "Edumate", group: "Application", color: "#f2a35e", weight: 0.8 },
    { id: "edumate_sync", name: "Edumate Sync", group: "Application", color: "#f07f55", weight: 0.5 },
    { id: "enrolhq", name: "EnrolHQ", group: "Application", color: "#db81a8", weight: 0.8 },
    { id: "enrolhq_sync", name: "EnrolHQ Sync", group: "Application", color: "#d86f82", weight: 0.5 },
    { id: "browsers", name: "Browsers", group: "Application", color: "#6fc5d5", weight: 0.9 },
    { id: "software_dev", name: "Software Dev", group: "Application", color: "#f2c14e", weight: 1.2 },
    { id: "windows", name: "Windows", group: "Operating Systems", color: "#4fa3d9", weight: 1.2 },
    { id: "macos", name: "macOS", group: "Operating Systems", color: "#9ca8b5", weight: 0.35 },
    { id: "linux", name: "Linux", group: "Operating Systems", color: "#8fb25f", weight: 0.55 },
    { id: "networking", name: "Networking", group: "Infrastructure", color: "#6da8d9", weight: 1.2 },
    { id: "identity", name: "Identity", group: "Infrastructure", color: "#c48bd5", weight: 1.2 },
    { id: "email_teams", name: "Email and Teams", group: "Infrastructure", color: "#5cbac0", weight: 1.1 },
    { id: "smsglobal", name: "SMSGlobal", group: "Infrastructure", color: "#68c77f", weight: 0.7 },
    { id: "integrations", name: "Integrations", group: "Infrastructure", color: "#b58ad8", weight: 1.1 },
    { id: "cloud_kubernetes", name: "Cloud and Kubernetes", group: "Infrastructure", color: "#8aa8ff", weight: 0.9 },
    { id: "backups", name: "Backups", group: "Infrastructure", color: "#d6d171", weight: 0.7 },
    { id: "databases", name: "Databases", group: "Data and Finance", color: "#7cc7a0", weight: 1 },
    { id: "data_engineering", name: "Data Engineering", group: "Data and Finance", color: "#9f9eed", weight: 1 },
    { id: "payroll", name: "Payroll", group: "Data and Finance", color: "#d7a3dd", weight: 0.7 },
    { id: "billing", name: "Billing", group: "Data and Finance", color: "#d88d5b", weight: 0.7 },
    { id: "payroll_billing", name: "Payroll & Billing", group: "Data and Finance", color: "#c58a74", weight: 0.8 },
    { id: "finance_spreadsheets", name: "Finance and Spreadsheets", group: "Data and Finance", color: "#58a79e", weight: 0.9 },
    { id: "banking", name: "Banking", group: "Data and Finance", color: "#7ac48a", weight: 0.7 },
    { id: "cybersecurity", name: "Cybersecurity", group: "Security", color: "#e05d5d", weight: 1.3 },
    { id: "operations", name: "Operations", group: "Operations", color: "#8d948f", weight: 0.4 },
  ];
  const queueCategoryAliases = new Map([
    ...queueCategoryDefs.map((category) => [category.name.toLowerCase(), category.name]),
    ["access", "Identity"],
    ["data", "Data Engineering"],
    ["education apps", "Edumate"],
    ["integration", "Integrations"],
    ["linux and macos", "Linux"],
    ["linux & macos", "Linux"],
    ["messaging", "Email and Teams"],
    ["network", "Networking"],
    ["os support", "Windows"],
    ["security", "Cybersecurity"],
    ["software", "Software Dev"],
  ]);
  const newsHeadlines = [
    "Printer promoted to senior infrastructure after surviving its third paper jam.",
    "Change advisory board approves emergency meeting to discuss scheduling another meeting.",
    "User confirms nothing changed, except the password, laptop, office, and legal name.",
    "Vendor identifies the root cause as an unsupported interpretation of the contract.",
    "Production is stable after monitoring was temporarily disabled.",
    "New dashboard proves the queue is green when viewed from sufficiently far away.",
    "Cybersecurity reminds staff that 'Password1!' is not stronger because it sounds excited.",
    "Procurement discovers a spare HDMI dongle in the locked drawer containing the drawer key.",
    "Service desk closes duplicate ticket; original ticket immediately files an appeal.",
    "Cloud costs fall sharply after Finance closes the browser tab.",
    "The backup completed successfully. Restoration remains a separate premium feature.",
    "Network team reports packets are arriving eventually and asks everyone to lower expectations.",
    "A critical spreadsheet has been placed under change control and emotional observation.",
    "New starter receives access to every system except the one required for their job.",
    "AI assistant confidently resolves ticket assigned to a different company.",
    "Facilities confirms the server room temperature is technically a number.",
    "Monitoring alert cleared after the alerting server became unavailable.",
    "The ticket queue has opened a ticket about the ticket queue.",
  ];

  const els = {
    resolved: document.getElementById("resolvedValue"),
    total: document.getElementById("totalValue"),
    tps: document.getElementById("tpsValue"),
    queue: document.getElementById("queueValue"),
    sla: document.getElementById("slaValue"),
    bonus: document.getElementById("bonusValue"),
    heatMeter: document.getElementById("heatMeterFill"),
    clickPower: document.getElementById("clickPowerLabel"),
    deskStage: document.querySelector(".desk-stage"),
    incidentAlert: document.getElementById("incidentAlert"),
    activeIncident: document.getElementById("activeIncident"),
    activeIncidentCategory: document.getElementById("activeIncidentCategory"),
    activeIncidentText: document.getElementById("activeIncidentText"),
    activeIncidentImpact: document.getElementById("activeIncidentImpact"),
    newsTicker: document.getElementById("newsTicker"),
    newsTickerText: document.getElementById("newsTickerText"),
    newsTickerMeta: document.getElementById("newsTickerMeta"),
    moraleMeter: document.getElementById("moraleMeter"),
    moraleMeterFill: document.getElementById("moraleMeterFill"),
    moraleMeterValue: document.getElementById("moraleMeterValue"),
    officeEvolution: document.getElementById("officeEvolution"),
    officeProps: [...document.querySelectorAll(".office-prop")],
    officeLevelName: document.getElementById("officeLevelName"),
    officeLevelProgress: document.getElementById("officeLevelProgress"),
    ticketConveyor: document.getElementById("ticketConveyor"),
    conveyorTickets: [...document.querySelectorAll(".conveyor-ticket")],
    ticketButton: document.getElementById("ticketButton"),
    ticketStamp: document.getElementById("ticketStamp"),
    nextObjective: document.getElementById("nextObjective"),
    objectiveName: document.getElementById("objectiveName"),
    objectiveValue: document.getElementById("objectiveValue"),
    objectiveProgressFill: document.getElementById("objectiveProgressFill"),
    objectiveHint: document.getElementById("objectiveHint"),
    upgradeList: document.getElementById("upgradeList"),
    buyModeButtons: [...document.querySelectorAll("[data-buy-mode]")],
    upgradeFilterButtons: [...document.querySelectorAll("[data-upgrade-filter]")],
    upgradeResultCount: document.getElementById("upgradeResultCount"),
    procurementCollectionCount: document.getElementById("procurementCollectionCount"),
    procurementCollectionNext: document.getElementById("procurementCollectionNext"),
    procurementCollectionFill: document.getElementById("procurementCollectionFill"),
    achievementList: document.getElementById("achievementList"),
    achievementDrawer: document.getElementById("achievementDrawer"),
    achievementDrawerButton: document.getElementById("achievementDrawerButton"),
    achievementDrawerBackdrop: document.getElementById("achievementDrawerBackdrop"),
    achievementDrawerClose: document.getElementById("achievementDrawerClose"),
    achievementFilterButtons: [...document.querySelectorAll("[data-achievement-filter]")],
    achievementResultCount: document.getElementById("achievementResultCount"),
    reputationLevel: document.getElementById("reputationLevel"),
    reputationProgressFill: document.getElementById("reputationProgressFill"),
    reputationNext: document.getElementById("reputationNext"),
    reputationBonus: document.getElementById("reputationBonus"),
    queueCompositionTotal: document.getElementById("queueCompositionTotal"),
    queueCompositionList: document.getElementById("queueCompositionList"),
    buffStrip: document.getElementById("buffStrip"),
    timelineList: document.getElementById("timelineList"),
    logList: document.getElementById("logList"),
    saveButton: document.getElementById("saveButton"),
    resetButton: document.getElementById("resetButton"),
    saveStatus: document.getElementById("saveStatus"),
    floatingLayer: document.getElementById("floatingTextLayer"),
    canvas: document.getElementById("particleCanvas"),
    swimmingTickets: [...document.querySelectorAll(".swimming-ticket")],
    officeBugs: [...document.querySelectorAll(".office-bug")],
    mobileTabs: [...document.querySelectorAll("[data-mobile-tab]")],
    mobilePanels: [...document.querySelectorAll("[data-mobile-panel]")],
  };

  const ctx = els.canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let state = loadState();
  let lastFrame = performance.now();
  let renderAccumulator = 0;
  let saveAccumulator = 0;
  let displayedValues = null;
  let statusTimer = 0;
  let stampTimer = 0;
  let objectiveAnimationFrame = 0;
  let objectiveTransitionTimer = 0;
  let lastObjectiveId = null;
  let particles = [];
  let decorativeSprites = [];
  const upgradeViews = new Map();
  const affordableState = new Map();
  let majorIncidentUntil = 0;
  let wasMajorIncident = false;
  let activeIncident = null;
  let buyMode = "1";
  let upgradeFilter = "all";
  let currentMobileTab = "desk";
  let achievementFilter = "all";
  let achievementDrawerOpen = false;
  let achievementRenderSignature = "";
  let queueRenderSignature = "";
  let buffRenderSignature = "";
  let timelineRenderSignature = "";
  let currentNewsHeadline = "";
  let nextNewsAt = 0;
  let timelineEvents = state.log
    .slice(0, 4)
    .reverse()
    .map((item) => ({ message: item.message, type: item.type, time: item.time }));

  if (!state.log.length) {
    const shiftStart = {
      message: "Shift started. The queue is already pretending it is fine.",
      type: "success",
      time: Date.now(),
    };
    state.log.push(shiftStart);
    timelineEvents.push(shiftStart);
  }

  applyOfflineProgress();
  syncDisplayedValues();
  rotateNews(true);
  checkAchievements();
  resizeCanvas();
  initializeDecorations();
  render();

  els.ticketButton.addEventListener("click", handleTicketClick);
  els.nextObjective.addEventListener("click", handleObjectiveClick);
  els.officeBugs.forEach((bug) => bug.addEventListener("click", handleBugSquash));
  els.upgradeList.addEventListener("click", handleUpgradeClick);
  els.buyModeButtons.forEach((button) => button.addEventListener("click", handleBuyModeChange));
  els.upgradeFilterButtons.forEach((button) =>
    button.addEventListener("click", handleUpgradeFilterChange),
  );
  els.achievementDrawerButton.addEventListener("click", () =>
    setAchievementDrawerOpen(!achievementDrawerOpen),
  );
  els.achievementDrawerBackdrop.addEventListener("click", () => setAchievementDrawerOpen(false));
  els.achievementDrawerClose.addEventListener("click", () => setAchievementDrawerOpen(false));
  els.achievementFilterButtons.forEach((button) =>
    button.addEventListener("click", handleAchievementFilterChange),
  );
  els.saveButton.addEventListener("click", () => saveState(true));
  els.resetButton.addEventListener("click", resetGame);
  els.mobileTabs.forEach((tab) => {
    tab.addEventListener("click", handleMobileTabClick);
    tab.addEventListener("keydown", handleMobileTabKeydown);
  });
  window.addEventListener("resize", handleResize);
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && achievementDrawerOpen) {
      setAchievementDrawerOpen(false);
    }
  });
  window.addEventListener("beforeunload", () => saveState(false));
  window.addEventListener("pagehide", () => saveState(false));
  document.addEventListener("visibilitychange", handleVisibilityChange);
  requestAnimationFrame(frame);

  function createDefaultState() {
    return {
      resolved: 0,
      totalResolved: 0,
      totalSpent: 0,
      openTickets: 24,
      queueComposition: createInitialQueueComposition(24),
      manualClicks: 0,
      incidentsTriggered: 0,
      bugsSquashed: 0,
      buffsActivated: 0,
      queueClears: 0,
      maxOpenTickets: 24,
      upgrades: Object.fromEntries(upgradeDefs.map((upgrade) => [upgrade.id, 0])),
      achievements: {},
      log: [],
      lastSave: Date.now(),
      nextIncidentAt: Date.now() + randomBetween(28000, 52000),
      nextBuffAt: Date.now() + randomBetween(30000, 55000),
      activeBuffs: {},
      lastIncidentLabel: "",
      nextMilestoneIndex: 0,
    };
  }

  function loadState() {
    const fresh = createDefaultState();

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return fresh;
      }

      const saved = JSON.parse(raw);
      const merged = {
        ...fresh,
        ...saved,
        upgrades: {
          ...fresh.upgrades,
          ...(saved.upgrades || {}),
        },
        achievements: {
          ...(saved.achievements || {}),
        },
        activeBuffs: {
          ...(saved.activeBuffs || {}),
        },
        log: Array.isArray(saved.log) ? saved.log.slice(0, 6) : [],
      };

      merged.resolved = cleanNumber(merged.resolved);
      merged.totalResolved = cleanNumber(merged.totalResolved);
      merged.totalSpent = cleanNumber(merged.totalSpent);
      merged.openTickets = Math.max(0, cleanNumber(merged.openTickets));
      merged.queueComposition = sanitizeQueueComposition(
        merged.queueComposition,
        merged.openTickets,
      );
      merged.manualClicks = Math.max(0, cleanNumber(merged.manualClicks));
      merged.incidentsTriggered = Math.max(0, Math.floor(cleanNumber(merged.incidentsTriggered)));
      merged.bugsSquashed = Math.max(0, Math.floor(cleanNumber(merged.bugsSquashed)));
      merged.buffsActivated = Math.max(0, Math.floor(cleanNumber(merged.buffsActivated)));
      merged.queueClears = Math.max(0, Math.floor(cleanNumber(merged.queueClears)));
      merged.maxOpenTickets = Math.max(
        merged.openTickets,
        cleanNumber(merged.maxOpenTickets),
      );
      merged.lastSave = Number.isFinite(merged.lastSave) ? merged.lastSave : Date.now();
      merged.nextIncidentAt = Number.isFinite(merged.nextIncidentAt)
        ? merged.nextIncidentAt
        : Date.now() + randomBetween(28000, 52000);
      merged.nextBuffAt = Number.isFinite(merged.nextBuffAt)
        ? merged.nextBuffAt
        : Date.now() + randomBetween(30000, 55000);
      merged.nextMilestoneIndex = Number.isFinite(merged.nextMilestoneIndex)
        ? merged.nextMilestoneIndex
        : 0;
      for (const [buffId, expiresAt] of Object.entries(merged.activeBuffs)) {
        if (
          !buffDefs.some((buff) => buff.id === buffId) ||
          !Number.isFinite(expiresAt) ||
          expiresAt <= Date.now()
        ) {
          delete merged.activeBuffs[buffId];
        }
      }

      for (const upgrade of upgradeDefs) {
        merged.upgrades[upgrade.id] = Math.max(0, Math.floor(cleanNumber(merged.upgrades[upgrade.id])));
      }

      return merged;
    } catch {
      return fresh;
    }
  }

  function cleanNumber(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
  }

  function normalizeCategoryName(category) {
    const text = String(category || "").trim().toLowerCase();
    return queueCategoryAliases.get(text) || "Operations";
  }

  function getIncidentCategory(incident) {
    return normalizeCategoryName(incident.category || classifyIncident(incident.label));
  }

  function getAmbientQueueWeights() {
    return Object.fromEntries(
      queueCategoryDefs.map((category) => [
        category.name,
        Math.max(0, cleanNumber(category.weight)),
      ]),
    );
  }

  function createInitialQueueComposition(total) {
    return allocateQueueTickets(total, getAmbientQueueWeights());
  }

  function allocateQueueTickets(total, weights) {
    const cleanTotal = Math.max(0, cleanNumber(total));
    const entries = Object.entries(weights)
      .map(([category, weight]) => [
        normalizeCategoryName(category),
        Math.max(0, cleanNumber(weight)),
      ])
      .filter(([, weight]) => weight > 0);
    const weightTotal = entries.reduce((sum, [, weight]) => sum + weight, 0);
    const composition = {};

    if (cleanTotal <= 0 || weightTotal <= 0) {
      return composition;
    }

    for (const [category, weight] of entries) {
      composition[category] = (composition[category] || 0) + cleanTotal * (weight / weightTotal);
    }
    return composition;
  }

  function sanitizeQueueComposition(composition, targetTotal) {
    const cleanTarget = Math.max(0, cleanNumber(targetTotal));
    const normalized = {};

    if (composition && typeof composition === "object") {
      for (const [category, count] of Object.entries(composition)) {
        const cleanCount = Math.max(0, cleanNumber(count));
        if (cleanCount > 0) {
          const normalizedCategory = normalizeCategoryName(category);
          normalized[normalizedCategory] = (normalized[normalizedCategory] || 0) + cleanCount;
        }
      }
    }

    if (cleanTarget <= 0) {
      return {};
    }

    const currentTotal = Object.values(normalized).reduce((sum, count) => sum + count, 0);
    if (currentTotal <= 0) {
      return createInitialQueueComposition(cleanTarget);
    }

    const scale = cleanTarget / currentTotal;
    for (const category of Object.keys(normalized)) {
      normalized[category] *= scale;
    }
    return normalized;
  }

  function addQueueTickets(amount, category) {
    const cleanAmount = Math.max(0, cleanNumber(amount));
    if (cleanAmount <= 0) {
      return;
    }

    const normalizedCategory = normalizeCategoryName(category);
    state.openTickets += cleanAmount;
    state.queueComposition = state.queueComposition || {};
    state.queueComposition[normalizedCategory] =
      (state.queueComposition[normalizedCategory] || 0) + cleanAmount;
  }

  function addQueueTicketsByWeights(amount, weights) {
    const cleanAmount = Math.max(0, cleanNumber(amount));
    if (cleanAmount <= 0) {
      return;
    }

    state.openTickets += cleanAmount;
    state.queueComposition = state.queueComposition || {};
    const added = allocateQueueTickets(cleanAmount, weights);
    for (const [category, count] of Object.entries(added)) {
      state.queueComposition[category] = (state.queueComposition[category] || 0) + count;
    }
  }

  function removeQueueTickets(amount) {
    const cleanAmount = Math.max(0, cleanNumber(amount));
    const previousTotal = Math.max(0, cleanNumber(state.openTickets));
    const removed = Math.min(previousTotal, cleanAmount);

    state.openTickets = Math.max(0, previousTotal - cleanAmount);
    if (removed <= 0) {
      return;
    }

    state.queueComposition = sanitizeQueueComposition(state.queueComposition, previousTotal);
    const compositionTotal = Object.values(state.queueComposition).reduce(
      (sum, count) => sum + count,
      0,
    );

    if (compositionTotal <= 0 || removed >= compositionTotal) {
      state.queueComposition = {};
      return;
    }

    for (const category of Object.keys(state.queueComposition)) {
      const share = state.queueComposition[category] / compositionTotal;
      state.queueComposition[category] = Math.max(
        0,
        state.queueComposition[category] - removed * share,
      );
    }
    state.queueComposition = sanitizeQueueComposition(
      state.queueComposition,
      state.openTickets,
    );
  }

  function getQueueDisplayCounts(total) {
    const roundedTotal = Math.max(0, Math.round(total));
    const composition = sanitizeQueueComposition(state.queueComposition, state.openTickets);
    state.queueComposition = composition;
    const compositionTotal = Object.values(composition).reduce((sum, count) => sum + count, 0);

    if (roundedTotal <= 0 || compositionTotal <= 0) {
      return queueCategoryDefs.map(() => 0);
    }

    const exactCounts = queueCategoryDefs.map(
      (category) => ((composition[category.name] || 0) / compositionTotal) * roundedTotal,
    );
    const counts = exactCounts.map((count) => Math.floor(count));
    let remaining = roundedTotal - counts.reduce((sum, count) => sum + count, 0);
    const fractionalOrder = exactCounts
      .map((count, index) => ({ index, fraction: count - Math.floor(count) }))
      .sort((a, b) => b.fraction - a.fraction);

    for (const { index } of fractionalOrder) {
      if (remaining <= 0) {
        break;
      }
      counts[index] += 1;
      remaining -= 1;
    }
    return counts;
  }

  function frame(now) {
    if (document.hidden) {
      lastFrame = now;
      requestAnimationFrame(frame);
      return;
    }

    const delta = Math.min(0.25, (now - lastFrame) / 1000);
    lastFrame = now;

    tick(delta);
    updateParticles(delta);
    updateDecorations(delta);
    updateDisplayedValues(delta);
    renderLiveNumbers();

    renderAccumulator += delta;
    saveAccumulator += delta;

    if (renderAccumulator >= 0.15) {
      render();
      renderAccumulator = 0;
    }

    if (saveAccumulator >= 5) {
      saveState(false);
      saveAccumulator = 0;
    }

    requestAnimationFrame(frame);
  }

  function tick(delta) {
    const incoming = getIncomingRate() * delta;
    addQueueTicketsByWeights(incoming, getAmbientQueueWeights());
    trackQueuePeak();

    const passive = getTicketsPerSecond() * delta;
    if (passive > 0) {
      addResolved(passive);
    }

    if (Date.now() >= state.nextIncidentAt) {
      triggerIncident();
    }
    if (Date.now() >= nextNewsAt) {
      rotateNews();
    }

    updateBuffs();
    checkMilestones();
    checkAchievements();
  }

  function handleTicketClick(event) {
    const clickPower = getClickPower();
    const point = getEventPoint(event);

    state.manualClicks += 1;
    addResolved(clickPower);
    spawnBurst(point.x, point.y, clickPower);
    spawnTicketRain(point.x, clickPower);
    showFloatingText(point.x, point.y, `+${formatNumber(clickPower)}`);
    playTicketStamp();
    checkMilestones();
    checkAchievements();
    render();
  }

  function handleBugSquash(event) {
    event.stopPropagation();

    const bug = event.currentTarget;
    if (bug.classList.contains("is-squashed")) {
      return;
    }

    const sprite = decorativeSprites.find((item) => item.element === bug);
    const stageRect = els.deskStage.getBoundingClientRect();
    const bugRect = bug.getBoundingClientRect();
    const pointerX = event.clientX || bugRect.left + bugRect.width / 2;
    const pointerY = event.clientY || bugRect.top + bugRect.height / 2;
    const point = {
      x: pointerX - stageRect.left,
      y: pointerY - stageRect.top,
    };
    const bonus = Math.max(5, getClickPower() * 8 + getTicketsPerSecond() * 0.5);

    addResolved(bonus);
    state.bugsSquashed += 1;
    spawnBurst(point.x, point.y, bonus);
    showFloatingText(point.x, point.y, `BUG BONUS +${formatNumber(bonus)}`);
    addTimelineEvent(`Bug squashed: +${formatNumber(bonus)}`, "success");
    setSaveStatus("Bug squashed");
    bug.classList.add("is-squashed");

    if (sprite) {
      sprite.squashed = true;
    }

    window.setTimeout(() => {
      bug.classList.remove("is-squashed");
      if (sprite) {
        const stageWidth = els.canvas.clientWidth;
        const stageHeight = els.canvas.clientHeight;
        sprite.x = randomBetween(0, Math.max(1, stageWidth - sprite.width));
        sprite.y = randomBetween(0, Math.max(1, stageHeight - sprite.height));
        sprite.pauseRemaining = 0;
        sprite.squashed = false;
        chooseNewDecorativeCourse(sprite);
        positionDecorativeSprite(sprite);
      }
    }, randomBetween(2200, 5200));

    checkMilestones();
    checkAchievements();
    render();
  }

  function playTicketStamp() {
    window.clearTimeout(stampTimer);
    els.ticketStamp.classList.remove("is-stamping");
    void els.ticketStamp.offsetWidth;
    els.ticketStamp.classList.add("is-stamping");
    stampTimer = window.setTimeout(() => {
      els.ticketStamp.classList.remove("is-stamping");
    }, 560);
  }

  function handleUpgradeClick(event) {
    const button = event.target.closest(".upgrade-item");
    if (!button || button.disabled) {
      return;
    }

    buyUpgrade(button.dataset.upgradeId);
  }

  function handleObjectiveClick() {
    const objective = getNextObjectiveUpgrade();
    if (!objective) {
      setMobileTab("shop", true);
      return;
    }

    if (upgradeFilter !== "all") {
      upgradeFilter = "all";
      for (const button of els.upgradeFilterButtons) {
        const active = button.dataset.upgradeFilter === "all";
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      }
      renderUpgrades();
    }

    setMobileTab("shop", true);
    const view = upgradeViews.get(objective.id);
    if (view) {
      view.button.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
      window.setTimeout(() => view.button.focus({ preventScroll: true }), reduceMotion ? 0 : 260);
    }
  }

  function handleMobileTabClick(event) {
    setMobileTab(event.currentTarget.dataset.mobileTab || "desk", false);
  }

  function handleMobileTabKeydown(event) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const currentIndex = els.mobileTabs.indexOf(event.currentTarget);
    let nextIndex = currentIndex;
    if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + els.mobileTabs.length) % els.mobileTabs.length;
    } else if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % els.mobileTabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = els.mobileTabs.length - 1;
    }
    const nextTab = els.mobileTabs[nextIndex];
    setMobileTab(nextTab.dataset.mobileTab || "desk", true);
  }

  function setMobileTab(tabName, focusTab) {
    currentMobileTab = ["desk", "queue", "shop"].includes(tabName) ? tabName : "desk";
    for (const tab of els.mobileTabs) {
      const active = tab.dataset.mobileTab === currentMobileTab;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && focusTab) {
        tab.focus({ preventScroll: true });
      }
    }
    for (const panel of els.mobilePanels) {
      panel.classList.toggle("is-mobile-active", panel.dataset.mobilePanel === currentMobileTab);
    }
  }

  function handleBuyModeChange(event) {
    buyMode = event.currentTarget.dataset.buyMode || "1";
    for (const button of els.buyModeButtons) {
      const active = button.dataset.buyMode === buyMode;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    }
    renderUpgrades();
  }

  function handleUpgradeFilterChange(event) {
    upgradeFilter = event.currentTarget.dataset.upgradeFilter || "all";
    for (const button of els.upgradeFilterButtons) {
      const active = button.dataset.upgradeFilter === upgradeFilter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    }
    renderUpgrades();
  }

  function handleAchievementFilterChange(event) {
    achievementFilter = event.currentTarget.dataset.achievementFilter || "all";
    for (const button of els.achievementFilterButtons) {
      const active = button.dataset.achievementFilter === achievementFilter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    }
    achievementRenderSignature = "";
    renderAchievements();
  }

  function buyUpgrade(upgradeId) {
    const upgrade = upgradeDefs.find((item) => item.id === upgradeId);
    if (!upgrade) {
      return;
    }

    const purchase = getBulkPurchase(upgrade, buyMode);
    if (!purchase.quantity || state.resolved < purchase.cost) {
      setSaveStatus("Need more tickets");
      return;
    }

    state.resolved -= purchase.cost;
    state.totalSpent += purchase.cost;
    state.upgrades[upgrade.id] = owned(upgrade.id) + purchase.quantity;
    const quantityLabel = purchase.quantity > 1 ? ` x${formatNumber(purchase.quantity)}` : "";
    addLog(`Procurement approved: ${upgrade.name}${quantityLabel}.`, "success");
    setSaveStatus(`Approved x${formatNumber(purchase.quantity)}`);
    checkAchievements();
    saveState(false);
    render();
  }

  function addResolved(amount) {
    const previousQueue = state.openTickets;
    state.resolved += amount;
    state.totalResolved += amount;
    removeQueueTickets(amount);
    if (previousQueue >= 1 && state.openTickets < 1) {
      state.queueClears += 1;
    }
  }

  function trackQueuePeak() {
    state.maxOpenTickets = Math.max(state.maxOpenTickets, state.openTickets);
  }

  function owned(upgradeId) {
    return state.upgrades[upgradeId] || 0;
  }

  function getUpgradeCost(upgrade) {
    return Math.ceil(upgrade.baseCost * Math.pow(upgrade.growth, owned(upgrade.id)));
  }

  function getBulkCost(upgrade, quantity) {
    if (quantity <= 0) {
      return 0;
    }

    if (quantity <= 100) {
      let total = 0;
      const start = owned(upgrade.id);
      for (let index = 0; index < quantity; index += 1) {
        total += Math.ceil(upgrade.baseCost * Math.pow(upgrade.growth, start + index));
      }
      return total;
    }

    const firstRaw = upgrade.baseCost * Math.pow(upgrade.growth, owned(upgrade.id));
    const geometricTotal =
      firstRaw * ((Math.pow(upgrade.growth, quantity) - 1) / (upgrade.growth - 1));
    return Math.ceil(geometricTotal);
  }

  function getBulkPurchase(upgrade, mode = buyMode) {
    if (mode !== "max") {
      const quantity = Math.max(1, Number.parseInt(mode, 10) || 1);
      return {
        quantity,
        cost: getBulkCost(upgrade, quantity),
      };
    }

    const budget = Math.max(0, state.resolved);
    const firstCost = getUpgradeCost(upgrade);
    if (budget < firstCost) {
      return { quantity: 0, cost: firstCost };
    }

    const firstRaw = upgrade.baseCost * Math.pow(upgrade.growth, owned(upgrade.id));
    const estimate = Math.floor(
      Math.log1p((budget * (upgrade.growth - 1)) / firstRaw) / Math.log(upgrade.growth),
    );
    let quantity = Math.max(1, Math.min(100000, estimate));
    let cost = getBulkCost(upgrade, quantity);

    while (quantity > 1 && cost > budget) {
      quantity -= 1;
      cost = getBulkCost(upgrade, quantity);
    }

    while (quantity < 100000) {
      const nextCost = getBulkCost(upgrade, quantity + 1);
      if (nextCost > budget || !Number.isFinite(nextCost)) {
        break;
      }
      quantity += 1;
      cost = nextCost;
    }

    return { quantity, cost };
  }

  function getAchievementMetric(metric) {
    if (metric === "resolved") {
      return state.totalResolved;
    }
    if (metric === "manualClicks") {
      return state.manualClicks;
    }
    if (metric === "tps") {
      return getTicketsPerSecond();
    }
    if (metric === "clickPower") {
      return getClickPower();
    }
    if (metric === "upgradesOwned") {
      return Object.values(state.upgrades).reduce((total, count) => total + count, 0);
    }
    if (metric === "distinctUpgrades") {
      return Object.values(state.upgrades).filter((count) => count > 0).length;
    }
    if (metric === "spent") {
      return state.totalSpent;
    }
    if (metric === "incidentsTriggered") {
      return state.incidentsTriggered;
    }
    if (metric === "bugsSquashed") {
      return state.bugsSquashed;
    }
    if (metric === "buffsActivated") {
      return state.buffsActivated;
    }
    if (metric === "queueClears") {
      return state.queueClears;
    }
    if (metric === "maxOpenTickets") {
      return state.maxOpenTickets;
    }
    return 0;
  }

  function getAchievementBonus() {
    return Object.keys(state.achievements).length * 0.02;
  }

  function getProductivityMultiplier() {
    return 1 + getAchievementBonus();
  }

  function getClickPower() {
    let flat = 1;
    let multiplier = 1;

    for (const upgrade of upgradeDefs) {
      const count = owned(upgrade.id);
      if (upgrade.kind === "click-flat") {
        flat += upgrade.amount * count;
      }
      if (upgrade.kind === "click-mult") {
        multiplier += upgrade.amount * count;
      }
    }

    return flat * multiplier * getProductivityMultiplier() * getBuffMultiplier("click");
  }

  function getTicketsPerSecond() {
    let flat = 0;
    let multiplier = 1;

    for (const upgrade of upgradeDefs) {
      const count = owned(upgrade.id);
      if (upgrade.kind === "passive-flat") {
        flat += upgrade.amount * count;
      }
      if (upgrade.kind === "passive-mult") {
        multiplier += upgrade.amount * count;
      }
    }

    return flat * multiplier * getProductivityMultiplier() * getBuffMultiplier("passive");
  }

  function getIncomingRate() {
    const scale = Math.sqrt(Math.max(0, state.totalResolved)) / 220;
    const queueDrag = Math.min(1.8, state.openTickets / 1800);
    return Math.min(18, 0.22 + scale + queueDrag) * getBuffMultiplier("incoming");
  }

  function getBuffMultiplier(effect) {
    const now = Date.now();
    return buffDefs.reduce((multiplier, buff) => {
      if ((state.activeBuffs[buff.id] || 0) <= now) {
        return multiplier;
      }
      return multiplier * (buff.effects[effect] || 1);
    }, 1);
  }

  function updateBuffs() {
    const now = Date.now();
    for (const [buffId, expiresAt] of Object.entries(state.activeBuffs)) {
      if (expiresAt <= now) {
        const buff = buffDefs.find((item) => item.id === buffId);
        delete state.activeBuffs[buffId];
        if (buff) {
          addTimelineEvent(`${buff.name} expired`, "info");
        }
      }
    }

    if (now < state.nextBuffAt) {
      return;
    }

    const available = buffDefs.filter((buff) => !state.activeBuffs[buff.id]);
    const buff = available[Math.floor(Math.random() * available.length)] || buffDefs[0];
    state.activeBuffs[buff.id] = now + buff.duration;
    state.buffsActivated += 1;
    state.nextBuffAt = now + randomBetween(65000, 110000);
    addLog(`Temporary boost: ${buff.name}. ${buff.description}.`, "success");
  }

  function getSlaStatus() {
    const queue = state.openTickets;
    if (queue < 25) {
      return {
        label: "Calm",
        width: Math.max(8, queue),
        color: "#58c6a7",
      };
    }
    if (queue < 75) {
      return {
        label: "Busy",
        width: 35 + ((queue - 25) / 50) * 25,
        color: "#f2c14e",
      };
    }
    if (queue < 160) {
      return {
        label: "Hot",
        width: 62 + ((queue - 75) / 85) * 24,
        color: "#e8894f",
      };
    }
    return {
      label: "Major Incident",
      width: 100,
      color: "#e05d5d",
    };
  }

  function triggerIncident() {
    let eligible = incidentDefs.filter(
      (incident) =>
        state.totalResolved >= incident.minResolved && incident.label !== state.lastIncidentLabel,
    );
    if (!eligible.length) {
      eligible = incidentDefs.filter((incident) => state.totalResolved >= incident.minResolved);
    }
    const incident = eligible[Math.floor(Math.random() * eligible.length)] || incidentDefs[0];
    const pressureScale = 1 + Math.min(3, state.totalResolved / 12000);
    const amount = Math.round(incident.amount * pressureScale);

    const category = getIncidentCategory(incident);
    addQueueTickets(amount, category);
    state.incidentsTriggered += 1;
    trackQueuePeak();
    state.lastIncidentLabel = incident.label;
    state.nextIncidentAt = Date.now() + randomBetween(30000, 70000);
    activeIncident = {
      category,
      label: incident.label,
      amount,
      expiresAt: Date.now() + 12000,
    };
    if (amount >= 100 || state.openTickets >= 160) {
      majorIncidentUntil = Date.now() + 6500;
    }
    addLog(`${incident.label} +${formatNumber(amount)} open tickets.`, "warning");
  }

  function classifyIncident(label) {
    const text = label.toLowerCase();
    const rules = [
      ["Edumate Sync", /edumate.*(sync|merged|sibling|duplicate|guardian|withdrawn)|student.*edumate/],
      ["EnrolHQ Sync", /enrolhq.*(sync|duplicate|twins|webhook|export|applicant)/],
      ["Edumate", /edumate|parent portal|guardian/],
      ["EnrolHQ", /enrolhq|enrolment|school-tour/],
      ["SMSGlobal", /smsglobal|sender id|delivery receipt|mobile numbers/],
      ["Email and Teams", /sms |outlook|teams|mailbox|email|calendar|distribution list/],
      ["Browsers", /browser|chrome|edge|internet explorer|cookies|cache|pop-up|downloads folder|browser zoom/],
      ["Identity", /single sign-on|sso|conditional access|mfa|password reset|identity|guest access|break-glass|privileged-access|new starter.*account/],
      ["Cybersecurity", /phish|security|mfa|password|firewall|ransom|vulnerab|certificate|soc|siem|secret/],
      ["Networking", /network|wi-fi|wifi|dns|dhcp|router|switch|vlan|vpn|proxy|latency|packet|port 443|access point/],
      ["Windows", /windows|active directory|group policy|registry|powershell|domain controller|bitlocker/],
      ["macOS", /macos|macbook|homebrew|filevault|launchd|system keychain/],
      ["Linux", /linux|ubuntu|kernel|sudo|bash|zsh|selinux|systemd|cron|chmod|nfs|inode|filesystem|ssh|swap|ansible/],
      ["Databases", /database|sql|schema|query|index|replica|connection pool/],
      ["Data Engineering", /data|csv|pipeline|warehouse|database|sql|schema|etl|spark|kafka|airflow/],
      ["Integrations", /integration|api|webhook|connector|sync|oauth|sftp|middleware/],
      ["Payroll", /payroll|salary|overtime|superannuation|bank file/],
      ["Billing", /billing|invoice|gst|credit note|payment/],
      ["Finance and Spreadsheets", /finance|spreadsheet|excel|workbook|pivot|journal|ledger|budget/],
      ["Banking", /banking|bank|bsb|interest|fraud|payment gateway/],
      ["Cloud and Kubernetes", /cloud|kubernetes|pod|terraform|serverless|autoscaler/],
      ["Software Dev", /deploy|devops|build|release|production|repository|git|code|bug|container|docker/],
      ["Backups", /backup|restore|snapshot|retention|disaster recovery/],
      ["Printers", /printer|print|spooler|scanner|label printer/],
      ["Hardware and AV", /laptop|monitor|keyboard|mouse|camera|webcam|audio|projector|conference-room|usb-c|hdmi/],
      ["Service Desk", /ticket|requester|service portal|knowledge article|resolver group|incident bridge/],
      ["General IT", /operating system|update|patch|driver|reboot|boot|blue screen|install|software/],
    ];
    return rules.find(([, pattern]) => pattern.test(text))?.[0] || "Operations";
  }

  function checkMilestones() {
    while (
      state.nextMilestoneIndex < milestoneQueue.length &&
      state.totalResolved >= milestoneQueue[state.nextMilestoneIndex]
    ) {
      const milestone = milestoneQueue[state.nextMilestoneIndex];
      addLog(`${formatNumber(milestone)} total tickets closed. The dashboard noticed.`, "success");
      state.nextMilestoneIndex += 1;
    }
  }

  function checkAchievements() {
    for (const achievement of achievementDefs) {
      if (!state.achievements[achievement.id] && achievement.isUnlocked()) {
        state.achievements[achievement.id] = Date.now();
        addLog(`Achievement unlocked: ${achievement.emoji} ${achievement.name}.`, "success");
      }
    }
  }

  function addLog(message, type = "info") {
    state.log.unshift({
      message,
      type,
      time: Date.now(),
    });
    state.log = state.log.slice(0, 6);
    addTimelineEvent(message, type);
  }

  function addTimelineEvent(message, type = "info") {
    timelineEvents.unshift({
      message,
      type,
      time: Date.now(),
    });
    timelineEvents = timelineEvents.slice(0, 6);
  }

  function applyOfflineProgress() {
    applyElapsedProgress(0.65, "Offline automation");
  }

  function applyElapsedProgress(efficiency, label) {
    const now = Date.now();
    const secondsAway = Math.min(
      MAX_OFFLINE_SECONDS,
      Math.max(0, (now - state.lastSave) / 1000),
    );
    const passive = getTicketsPerSecond();

    if (secondsAway < 1 || passive <= 0) {
      state.lastSave = now;
      return 0;
    }

    const earned = passive * secondsAway * efficiency;
    const incoming = getIncomingRate() * secondsAway;
    addQueueTicketsByWeights(incoming, getAmbientQueueWeights());
    trackQueuePeak();
    addResolved(earned);
    addLog(`${label} closed ${formatNumber(earned)} tickets.`, "success");
    state.lastSave = now;
    return earned;
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      saveState(false);
      return;
    }

    const earned = applyElapsedProgress(1, "Background automation");
    lastFrame = performance.now();
    if (earned > 0) {
      setSaveStatus("Caught up");
    }
    saveState(false);
    render();
  }

  function saveState(showStatus) {
    try {
      state.lastSave = Date.now();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      if (showStatus) {
        setSaveStatus("Saved");
      }
    } catch {
      setSaveStatus("Save blocked");
    }
  }

  function resetGame() {
    const confirmed = window.confirm("Reset Ticket Clicker progress and start a fresh shift?");
    if (!confirmed) {
      return;
    }

    localStorage.removeItem(STORAGE_KEY);
    state = createDefaultState();
    state.log.push({
      message: "Fresh shift started. Procurement has forgotten everything.",
      type: "success",
      time: Date.now(),
    });
    timelineEvents = [
      {
        message: "Fresh shift started",
        type: "success",
        time: Date.now(),
      },
    ];
    activeIncident = null;
    majorIncidentUntil = 0;
    wasMajorIncident = false;
    particles = [];
    syncDisplayedValues();
    rotateNews(true);
    saveState(false);
    render();
  }

  function setSaveStatus(text) {
    els.saveStatus.textContent = text;
    window.clearTimeout(statusTimer);
    statusTimer = window.setTimeout(() => {
      els.saveStatus.textContent = "Ready";
    }, 1600);
  }

  function render() {
    const clickPower = getClickPower();
    const sla = getSlaStatus();

    renderLiveNumbers();
    els.sla.textContent = sla.label;
    els.bonus.textContent = `${Math.round(getAchievementBonus() * 100)}%`;
    els.heatMeter.style.width = `${Math.min(100, Math.max(8, sla.width))}%`;
    els.heatMeter.style.background = sla.color;
    setStackedNumber(els.clickPower, formatRateParts(clickPower), {
      prefix: "+",
      unitSuffix: `${clickPower === 1 ? "ticket" : "tickets"} per click`,
    });

    renderMajorIncident(sla);
    renderActiveIncident();
    renderQueueComposition();
    renderBuffs();
    renderTimeline();
    renderNextObjective();
    renderOfficeEvolution();
    renderMoraleMeter();
    renderUpgrades();
    renderAchievements();
    renderLog();
  }

  function syncDisplayedValues() {
    displayedValues = {
      resolved: state.resolved,
      totalResolved: state.totalResolved,
      openTickets: state.openTickets,
    };
  }

  function updateDisplayedValues(delta) {
    if (!displayedValues) {
      syncDisplayedValues();
      return;
    }

    const blend = reduceMotion ? 1 : 1 - Math.exp(-Math.max(0, delta) * 11);
    for (const key of Object.keys(displayedValues)) {
      const target = state[key];
      const difference = target - displayedValues[key];
      displayedValues[key] =
        Math.abs(difference) < 0.0001
          ? target
          : displayedValues[key] + difference * blend;
    }
  }

  function renderLiveNumbers() {
    const values = displayedValues || state;
    setStackedNumber(els.resolved, formatPrimaryNumberParts(values.resolved), {
      primary: true,
    });
    setStackedNumber(els.total, formatNumberParts(values.totalResolved));
    setStackedNumber(els.tps, formatPrimaryRateParts(getTicketsPerSecond()), {
      primary: true,
    });
    setStackedNumber(els.queue, formatNumberParts(values.openTickets));
  }

  function rotateNews(force = false) {
    const purchasedCount = Object.values(state.upgrades).filter((count) => count > 0).length;
    const unlockedCount = Object.keys(state.achievements).length;
    const dynamicHeadlines = [
      purchasedCount
        ? `Procurement celebrates ${formatNumber(purchasedCount)} approved solutions; storage celebrates nothing.`
        : "",
      unlockedCount
        ? `Desk reputation reaches ${formatNumber(unlockedCount)} commendations; management requests a pie chart.`
        : "",
      state.openTickets >= 100
        ? `Queue passes ${formatNumber(state.openTickets)} open tickets and is reclassified as a strategic backlog.`
        : "",
      state.bugsSquashed > 0
        ? `${formatNumber(state.bugsSquashed)} software bugs squashed; developers report several were features.`
        : "",
    ].filter(Boolean);
    const pool = [...newsHeadlines, ...dynamicHeadlines];
    let headline = pool[Math.floor(Math.random() * pool.length)] || newsHeadlines[0];

    if (!force && pool.length > 1) {
      while (headline === currentNewsHeadline) {
        headline = pool[Math.floor(Math.random() * pool.length)];
      }
    }

    currentNewsHeadline = headline;
    els.newsTickerText.textContent = headline;
    els.newsTickerText.title = headline;
    els.newsTickerMeta.textContent = `${new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })} · Service Desk Wire`;
    els.newsTicker.classList.remove("news-updated");
    void els.newsTicker.offsetWidth;
    els.newsTicker.classList.add("news-updated");
    nextNewsAt = Date.now() + randomBetween(9000, 15000);
  }

  function renderMajorIncident(sla) {
    const active = sla.label === "Major Incident" || Date.now() < majorIncidentUntil;
    els.deskStage.classList.toggle("major-incident", active);
    els.incidentAlert.setAttribute("aria-hidden", String(!active));
    const slaClass = `sla-${sla.label.toLowerCase().replace(/\s+/g, "-").replace("major-incident", "major")}`;
    els.deskStage.classList.remove("sla-calm", "sla-busy", "sla-hot", "sla-major");
    els.deskStage.classList.add(slaClass);

    const conveyorDurations = {
      Calm: 16,
      Busy: 10,
      Hot: 6.5,
      "Major Incident": 3.8,
    };
    els.ticketConveyor.style.setProperty(
      "--conveyor-duration",
      `${conveyorDurations[sla.label] || 12}s`,
    );
    els.ticketConveyor.classList.toggle("queue-low", state.openTickets < 25);
    els.ticketConveyor.classList.toggle(
      "queue-medium",
      state.openTickets >= 25 && state.openTickets < 100,
    );
    els.ticketConveyor.classList.toggle("queue-high", state.openTickets >= 100);
    els.ticketConveyor.classList.toggle("is-priority", active);

    if (active && !wasMajorIncident && !reduceMotion) {
      els.deskStage.classList.remove("incident-hit");
      void els.deskStage.offsetWidth;
      els.deskStage.classList.add("incident-hit");
      window.setTimeout(() => els.deskStage.classList.remove("incident-hit"), 480);
    }

    wasMajorIncident = active;
  }

  function renderActiveIncident() {
    const now = Date.now();
    if (activeIncident && activeIncident.expiresAt <= now) {
      activeIncident = null;
    }

    const visible = Boolean(activeIncident);
    els.activeIncident.setAttribute("aria-hidden", String(!visible));
    els.deskStage.classList.toggle("has-active-incident", visible);
    if (!activeIncident) {
      return;
    }

    els.activeIncidentCategory.textContent = activeIncident.category;
    els.activeIncidentText.textContent = activeIncident.label;
    setStackedNumber(
      els.activeIncidentImpact,
      formatNumberParts(activeIncident.amount),
      {
        prefix: "+",
        unitSuffix: "open tickets",
      },
    );
  }

  function renderQueueComposition() {
    const total = Math.max(0, Math.round(state.openTickets));
    const counts = getQueueDisplayCounts(total);

    const signature = `${total}:${counts.join(",")}`;
    setStackedNumber(els.queueCompositionTotal, formatNumberParts(total), {
      unitSuffix: "open tickets",
    });
    if (signature === queueRenderSignature) {
      return;
    }
    queueRenderSignature = signature;

    const fragment = document.createDocumentFragment();
    let currentGroup = "";
    queueCategoryDefs.forEach((category, index) => {
      if (category.group !== currentGroup) {
        currentGroup = category.group;
        const group = document.createElement("div");
        group.className = "queue-composition-group";

        const groupName = document.createElement("span");
        groupName.textContent = currentGroup;

        const groupCount = document.createElement("small");
        const groupTotal = queueCategoryDefs.reduce(
          (sum, item, itemIndex) =>
            item.group === currentGroup ? sum + counts[itemIndex] : sum,
          0,
        );
        groupCount.textContent = formatNumber(groupTotal);

        group.append(groupName, groupCount);
        fragment.append(group);
      }

      const row = document.createElement("div");
      row.className = "queue-composition-row";

      const name = document.createElement("span");
      name.textContent = category.name;
      name.title = category.name;

      const track = document.createElement("span");
      track.className = "queue-composition-track";
      track.style.setProperty("--queue-color", category.color);

      const fill = document.createElement("span");
      fill.style.width = `${total ? (counts[index] / total) * 100 : 0}%`;
      track.append(fill);

      const count = document.createElement("strong");
      setStackedNumber(count, formatNumberParts(counts[index]));
      row.append(name, track, count);
      fragment.append(row);
    });
    els.queueCompositionList.replaceChildren(fragment);
  }

  function renderBuffs() {
    const now = Date.now();
    const active = buffDefs
      .map((buff) => ({
        ...buff,
        remaining: Math.max(0, Math.ceil(((state.activeBuffs[buff.id] || 0) - now) / 1000)),
      }))
      .filter((buff) => buff.remaining > 0);
    const signature = active.map((buff) => `${buff.id}:${buff.remaining}`).join("|");
    if (signature === buffRenderSignature) {
      return;
    }
    buffRenderSignature = signature;

    if (!active.length) {
      const empty = document.createElement("span");
      empty.className = "buff-empty";
      empty.textContent = "No active operational boosts";
      els.buffStrip.replaceChildren(empty);
      return;
    }

    const fragment = document.createDocumentFragment();
    for (const buff of active) {
      const pill = document.createElement("span");
      pill.className = "buff-pill";

      const name = document.createElement("strong");
      name.textContent = buff.name;

      const description = document.createElement("span");
      description.textContent = buff.description;

      const time = document.createElement("time");
      time.textContent = `${buff.remaining}s`;
      pill.append(name, description, time);
      fragment.append(pill);
    }
    els.buffStrip.replaceChildren(fragment);
  }

  function renderTimeline() {
    const signature = timelineEvents
      .map((event) => `${event.time}:${event.type}:${event.message}`)
      .join("|");
    if (signature === timelineRenderSignature) {
      return;
    }
    timelineRenderSignature = signature;

    const fragment = document.createDocumentFragment();
    for (const event of timelineEvents) {
      const item = document.createElement("span");
      item.className = `timeline-event${event.type ? ` ${event.type}` : ""}`;
      item.textContent = event.message;
      item.title = event.message;
      fragment.append(item);
    }
    els.timelineList.replaceChildren(fragment);
  }

  function getOwnedProcurementCount() {
    return upgradeDefs.reduce((total, upgrade) => total + (owned(upgrade.id) > 0 ? 1 : 0), 0);
  }

  function getOfficeProgress() {
    const installed = getOwnedProcurementCount();
    let current = OFFICE_TIERS[0];
    let next = null;

    for (const tier of OFFICE_TIERS) {
      if (installed >= tier.requirement) {
        current = tier;
      } else {
        next = tier;
        break;
      }
    }

    return { installed, current, next };
  }

  function getNextObjectiveUpgrade() {
    return upgradeDefs.find((upgrade) => owned(upgrade.id) < 1) || null;
  }

  function updateObjectiveName(objectiveId, name) {
    if (lastObjectiveId === null) {
      lastObjectiveId = objectiveId;
      els.objectiveName.textContent = name;
      return;
    }

    if (lastObjectiveId === objectiveId) {
      if (!objectiveAnimationFrame) {
        els.objectiveName.textContent = name;
      }
      return;
    }

    lastObjectiveId = objectiveId;
    playObjectiveTransition(name);
  }

  function playObjectiveTransition(name) {
    window.cancelAnimationFrame(objectiveAnimationFrame);
    objectiveAnimationFrame = 0;
    window.clearTimeout(objectiveTransitionTimer);
    els.nextObjective.classList.remove("is-updating");
    void els.nextObjective.offsetWidth;
    els.nextObjective.classList.add("is-updating");

    if (reduceMotion) {
      els.objectiveName.textContent = name;
      objectiveTransitionTimer = window.setTimeout(
        () => els.nextObjective.classList.remove("is-updating"),
        900,
      );
      return;
    }

    const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#?/";
    const startedAt = performance.now();
    const duration = 720;
    els.nextObjective.setAttribute("aria-live", "off");

    const animate = (now) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const revealed = Math.floor(progress * name.length);
      els.objectiveName.textContent = [...name]
        .map((character, index) => {
          if (index < revealed || character === " " || /[^a-z0-9]/i.test(character)) {
            return character;
          }
          return glyphs[Math.floor(Math.random() * glyphs.length)];
        })
        .join("");

      if (progress < 1) {
        objectiveAnimationFrame = window.requestAnimationFrame(animate);
        return;
      }

      objectiveAnimationFrame = 0;
      els.objectiveName.textContent = name;
      els.nextObjective.setAttribute("aria-live", "polite");
      objectiveTransitionTimer = window.setTimeout(
        () => els.nextObjective.classList.remove("is-updating"),
        360,
      );
    };

    objectiveAnimationFrame = window.requestAnimationFrame(animate);
  }

  function renderNextObjective() {
    const upgrade = getNextObjectiveUpgrade();
    if (!upgrade) {
      els.nextObjective.classList.add("is-complete");
      els.nextObjective.classList.remove("is-ready");
      updateObjectiveName("__complete__", "Procurement portfolio complete");
      els.objectiveValue.textContent = `${upgradeDefs.length} / ${upgradeDefs.length}`;
      els.objectiveProgressFill.style.width = "100%";
      els.objectiveHint.textContent =
        "Every procurement is installed. Continue scaling or prepare for a new office.";
      els.nextObjective.setAttribute(
        "aria-label",
        "Procurement portfolio complete. Open procurement shop.",
      );
      return;
    }

    const cost = getUpgradeCost(upgrade);
    const affordable = state.resolved >= cost;
    const remaining = Math.max(0, cost - state.resolved);
    const progress = cost > 0 ? Math.min(100, (state.resolved / cost) * 100) : 100;
    els.nextObjective.classList.remove("is-complete");
    els.nextObjective.classList.toggle("is-ready", affordable);
    updateObjectiveName(upgrade.id, upgrade.name);
    els.objectiveValue.textContent = affordable
      ? "Ready to buy"
      : `${Math.floor(progress)}% funded`;
    els.objectiveProgressFill.style.width = `${progress}%`;
    els.objectiveHint.textContent = affordable
      ? "Budget ready. Open Procurement to approve this upgrade."
      : `Resolve ${formatNumber(remaining)} more ${remaining === 1 ? "ticket" : "tickets"}.`;
    els.nextObjective.setAttribute(
      "aria-label",
      affordable
        ? `${upgrade.name} is ready to purchase. Open procurement shop.`
        : `${upgrade.name}. Resolve ${formatNumber(remaining)} more tickets.`,
    );
  }

  function renderOfficeEvolution() {
    const office = getOfficeProgress();
    const classes = {
      "has-coffee": owned("coffee_refill") > 0,
      "has-monitor": owned("second_monitor") > 0 || owned("monitoring_bot") > 0,
      "has-bot": owned("monitoring_bot") > 0 || owned("auto_triage") > 0,
      "has-rack":
        owned("patch_window") > 0 ||
        owned("global_noc") > 0 ||
        owned("cloud_command_center") > 0,
      "has-plant": office.installed >= 1,
      "has-team": office.installed >= 5,
      "has-window": office.installed >= 25,
    };

    for (const [className, enabled] of Object.entries(classes)) {
      els.officeEvolution.classList.toggle(className, enabled);
    }
    for (const tier of OFFICE_TIERS) {
      els.deskStage.classList.toggle(`office-${tier.id}`, tier.id === office.current.id);
    }

    els.officeLevelName.textContent = office.current.name;
    els.officeLevelProgress.textContent = office.next
      ? `${office.installed} installed · ${office.next.requirement - office.installed} to ${
          office.next.name
        }`
      : `${office.installed} of ${upgradeDefs.length} procurements installed`;
    els.officeEvolution.setAttribute(
      "aria-label",
      `${office.current.name}. ${office.current.description}`,
    );

    const propDetails = [
      ["Coffee Refill Rotation", owned("coffee_refill")],
      ["Second Monitor", owned("second_monitor")],
      ["Monitoring Bot", Math.max(owned("monitoring_bot"), owned("auto_triage"))],
      [
        "Overnight Patch Window",
        Math.max(owned("patch_window"), owned("global_noc"), owned("cloud_command_center")),
      ],
      ["Approved Office Plant", Math.min(office.installed, 5)],
      ["Expanded Service Desk Team", Math.max(0, office.installed - 4)],
      ["Command Centre View", Math.max(0, office.installed - 24)],
    ];
    els.officeProps.forEach((prop, index) => {
      const [name, level] = propDetails[index];
      const label = `${name} · Level ${formatNumber(level)}`;
      prop.dataset.tooltip = label;
      prop.title = label;
      const tooltip = prop.querySelector(".office-tooltip");
      if (tooltip) {
        tooltip.textContent = label;
      }
    });
  }

  function renderMoraleMeter() {
    const unlockedCount = Object.keys(state.achievements).length;
    const progress = achievementDefs.length
      ? Math.min(100, (unlockedCount / achievementDefs.length) * 100)
      : 0;
    const rounded = Math.round(progress);
    els.moraleMeterFill.style.height = `${progress}%`;
    els.moraleMeterValue.textContent = `${rounded}%`;
    els.moraleMeter.setAttribute("aria-valuenow", String(rounded));
    els.moraleMeter.title =
      `${unlockedCount} of ${achievementDefs.length} reputations · ` +
      `${Math.round(getAchievementBonus() * 100)}% productivity bonus`;
  }

  function getUpgradePresentation(upgrade) {
    if (upgrade.kind === "click-flat") {
      return { icon: "⚡", label: "Click power", className: "click" };
    }
    if (upgrade.kind === "passive-flat") {
      return { icon: "🤖", label: "Automation", className: "automation" };
    }
    if (upgrade.kind === "click-mult") {
      return { icon: "🚀", label: "Click booster", className: "booster" };
    }
    return { icon: "⚙️", label: "Automation booster", className: "booster" };
  }

  function renderUpgrades() {
    if (!upgradeViews.size) {
      const fragment = document.createDocumentFragment();

      for (const upgrade of upgradeDefs) {
        const presentation = getUpgradePresentation(upgrade);
        const button = document.createElement("button");
        button.className = `upgrade-item upgrade-${presentation.className}`;
        button.type = "button";
        button.dataset.upgradeId = upgrade.id;

        const icon = document.createElement("span");
        icon.className = "upgrade-icon";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = presentation.icon;

        const copy = document.createElement("span");
        copy.className = "upgrade-copy";

        const heading = document.createElement("span");
        heading.className = "upgrade-heading";

        const name = document.createElement("strong");
        name.textContent = upgrade.name;

        const kind = document.createElement("small");
        kind.className = "upgrade-kind";
        kind.textContent = presentation.label;

        const description = document.createElement("span");
        description.className = "upgrade-description";
        description.textContent = upgrade.description;

        heading.append(name, kind);
        copy.append(heading, description);

        const meta = document.createElement("span");
        meta.className = "upgrade-meta";

        const costNode = document.createElement("span");
        costNode.className = "upgrade-cost";

        const ownedNode = document.createElement("span");
        ownedNode.className = "upgrade-owned";

        const affordability = document.createElement("span");
        affordability.className = "upgrade-affordability";

        const affordabilityLabel = document.createElement("span");
        affordabilityLabel.className = "upgrade-affordability-label";

        const affordabilityTrack = document.createElement("span");
        affordabilityTrack.className = "upgrade-affordability-track";

        const affordabilityFill = document.createElement("span");
        affordabilityTrack.append(affordabilityFill);
        affordability.append(affordabilityLabel, affordabilityTrack);

        meta.append(costNode, ownedNode);
        button.append(icon, copy, meta, affordability);
        fragment.append(button);
        upgradeViews.set(upgrade.id, {
          button,
          costNode,
          ownedNode,
          affordabilityLabel,
          affordabilityFill,
        });
      }

      els.upgradeList.append(fragment);
    }

    let visibleCount = 0;
    const objective = getNextObjectiveUpgrade();
    for (const upgrade of upgradeDefs) {
      const view = upgradeViews.get(upgrade.id);
      const purchase = getBulkPurchase(upgrade, buyMode);
      const count = owned(upgrade.id);
      const affordable = purchase.quantity > 0 && state.resolved >= purchase.cost;
      const remaining = Math.max(0, purchase.cost - state.resolved);
      const progress =
        purchase.cost > 0 ? Math.min(100, (state.resolved / purchase.cost) * 100) : 100;
      const wasAffordable = affordableState.get(upgrade.id);
      const visible = matchesUpgradeFilter(upgrade, affordable);

      view.button.hidden = !visible;
      if (visible) {
        visibleCount += 1;
      }
      view.button.disabled = !affordable;
      view.button.classList.toggle("is-affordable", affordable);
      view.button.classList.toggle("is-owned", count > 0);
      view.button.classList.toggle("is-recommended", objective?.id === upgrade.id);
      view.button.setAttribute(
        "aria-label",
        affordable
          ? `Buy ${formatNumber(purchase.quantity || 1)} ${upgrade.name} for ${formatNumber(
              purchase.cost,
            )} tickets. Ready to approve.`
          : `Buy ${formatNumber(purchase.quantity || 1)} ${upgrade.name} for ${formatNumber(
              purchase.cost,
            )} tickets. Need ${formatNumber(remaining)} more tickets.`,
      );
      setStackedNumber(view.costNode, formatNumberParts(purchase.cost), {
        unitSuffix: "tickets",
        detail:
          buyMode === "1"
            ? ""
            : `Buy ${formatNumber(purchase.quantity || 0)}`,
      });
      setStackedNumber(view.ownedNode, formatNumberParts(count), {
        unitSuffix: "owned",
      });
      view.affordabilityLabel.textContent = affordable
        ? "Ready to approve"
        : `Need ${formatNumber(remaining)} more`;
      view.affordabilityFill.style.width = `${progress}%`;

      if (wasAffordable === false && affordable && !reduceMotion) {
        view.button.classList.remove("newly-affordable");
        void view.button.offsetWidth;
        view.button.classList.add("newly-affordable");
        window.setTimeout(() => view.button.classList.remove("newly-affordable"), 950);
      }
      affordableState.set(upgrade.id, affordable);
    }
    els.upgradeResultCount.textContent = `${visibleCount} upgrade${visibleCount === 1 ? "" : "s"}`;

    const office = getOfficeProgress();
    const collectionProgress = upgradeDefs.length
      ? Math.min(100, (office.installed / upgradeDefs.length) * 100)
      : 0;
    els.procurementCollectionCount.textContent =
      `${office.installed} of ${upgradeDefs.length} installed`;
    els.procurementCollectionNext.textContent = office.next
      ? `Next office: ${office.next.name} at ${office.next.requirement}`
      : "Portfolio complete · new office ready";
    els.procurementCollectionFill.style.width = `${collectionProgress}%`;
  }

  function matchesUpgradeFilter(upgrade, affordable) {
    if (upgradeFilter === "affordable") {
      return affordable;
    }
    if (upgradeFilter === "click") {
      return upgrade.kind === "click-flat";
    }
    if (upgradeFilter === "automation") {
      return upgrade.kind === "passive-flat";
    }
    if (upgradeFilter === "boosters") {
      return upgrade.kind.endsWith("mult");
    }
    if (upgradeFilter === "enterprise") {
      return upgrade.baseCost >= 1000000;
    }
    return true;
  }

  function renderAchievements() {
    const unlockedCount = achievementDefs.filter((achievement) =>
      Boolean(state.achievements[achievement.id]),
    ).length;
    const nextAchievement = achievementDefs.find(
      (achievement) => !state.achievements[achievement.id],
    );
    const nextProgress = nextAchievement ? getAchievementProgress(nextAchievement.id) : 1;

    els.reputationLevel.textContent = `${unlockedCount} of ${achievementDefs.length} achievements`;
    els.reputationProgressFill.style.width = `${Math.min(100, nextProgress * 100)}%`;
    els.reputationNext.textContent = nextAchievement
      ? `Next: ${nextAchievement.name} · ${Math.round(nextProgress * 100)}%`
      : "All desk reputation milestones unlocked";
    els.reputationBonus.textContent = `+${Math.round(getAchievementBonus() * 100)}% productivity`;

    const signature = `${achievementFilter}:` + achievementDefs
      .map((achievement) => `${achievement.id}:${Boolean(state.achievements[achievement.id])}`)
      .join("|");
    if (signature === achievementRenderSignature) {
      return;
    }
    achievementRenderSignature = signature;

    const fragment = document.createDocumentFragment();
    let visibleCount = 0;

    for (const achievement of achievementDefs) {
      if (
        achievementFilter !== "all" &&
        achievement.category !== achievementFilter
      ) {
        continue;
      }
      visibleCount += 1;
      const unlocked = Boolean(state.achievements[achievement.id]);
      const item = document.createElement("div");
      item.className = `achievement${unlocked ? " unlocked" : ""}`;

      const badge = document.createElement("span");
      badge.className = "achievement-badge";
      badge.textContent = achievement.emoji || "🏅";
      badge.setAttribute("aria-hidden", "true");

      const copy = document.createElement("div");
      copy.className = "achievement-copy";

      const name = document.createElement("strong");
      name.textContent = unlocked ? achievement.name : "Locked reputation";

      const description = document.createElement("span");
      description.className = "achievement-description";
      description.textContent = achievement.description;

      const category = document.createElement("small");
      category.className = "achievement-category";
      category.textContent = achievement.category;

      copy.append(name, description, category);
      item.append(badge, copy);
      fragment.append(item);
    }

    els.achievementResultCount.textContent =
      `${visibleCount} reputation${visibleCount === 1 ? "" : "s"}`;
    els.achievementList.replaceChildren(fragment);
  }

  function getAchievementProgress(achievementId) {
    const catalogAchievement = catalogAchievementDefs.find(
      (achievement) => achievement.id === achievementId,
    );
    if (catalogAchievement) {
      return Math.min(
        1,
        Math.max(
          0,
          getAchievementMetric(catalogAchievement.metric) / catalogAchievement.target,
        ),
      );
    }

    const progress = {
      first_close: state.totalResolved / 1,
      procurement_started: Object.values(state.upgrades).some((count) => count > 0) ? 1 : 0,
      queue_tamer: state.totalResolved / 100,
      first_automation: getTicketsPerSecond() / 10,
      inbox_zeroish:
        state.totalResolved < 50
          ? state.totalResolved / 50
          : state.openTickets < 1
            ? 1
            : Math.max(0.5, 1 - state.openTickets / 200),
      incident_commander: state.totalResolved / 1000,
      script_whisperer: owned("auto_triage") / 5,
      major_release: state.totalResolved / 25000,
    };
    return Math.min(1, Math.max(0, progress[achievementId] || 0));
  }

  function setAchievementDrawerOpen(open) {
    achievementDrawerOpen = open;
    els.achievementDrawer.classList.toggle("is-open", open);
    els.achievementDrawer.setAttribute("aria-hidden", String(!open));
    els.achievementDrawerButton.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("drawer-open", open);
    if (open) {
      renderAchievements();
      window.setTimeout(() => els.achievementDrawerClose.focus(), 0);
    } else if (document.activeElement === els.achievementDrawerClose) {
      els.achievementDrawerButton.focus();
    }
  }

  function renderLog() {
    const fragment = document.createDocumentFragment();

    for (const item of state.log) {
      const li = document.createElement("li");
      li.className = item.type;
      li.textContent = item.message;
      fragment.append(li);
    }

    els.logList.replaceChildren(fragment);
  }

  function formatNumber(value) {
    return numberUnits.formatInline(formatNumberParts(value));
  }

  function formatNumberParts(value) {
    return numberUnits.formatParts(value, {
      floorExact: true,
      smallDecimal: true,
    });
  }

  function formatRate(value) {
    return numberUnits.formatInline(formatRateParts(value));
  }

  function formatRateParts(value) {
    const clean = Math.max(0, cleanNumber(value));
    if (clean < 100) {
      return numberUnits.formatParts(clean, {
        compactAt: 100,
        maximumFractionDigits: 1,
      });
    }
    return formatNumberParts(clean);
  }

  function formatPrimaryNumberParts(value) {
    return numberUnits.formatParts(value, {
      compactAt: PRIMARY_COMPACT_THRESHOLD,
      compactMinimumFractionDigits: 6,
      compactMaximumFractionDigits: 6,
      groupCompactFractionDigits: true,
      floorExact: true,
    });
  }

  function formatPrimaryRateParts(value) {
    return numberUnits.formatParts(value, {
      compactAt: PRIMARY_COMPACT_THRESHOLD,
      compactMinimumFractionDigits: 6,
      compactMaximumFractionDigits: 6,
      groupCompactFractionDigits: true,
      maximumFractionDigits: 1,
    });
  }

  function setStackedNumber(element, parts, options = {}) {
    const unitText = [parts.unit, options.unitSuffix]
      .filter(Boolean)
      .join(" ");
    const signature = [
      options.prefix || "",
      parts.number,
      unitText,
      options.detail || "",
    ].join("|");

    if (options.primary) {
      element.classList.toggle("primary-value-long", parts.number.length > 9);
      element.classList.toggle("primary-value-extra-long", parts.number.length > 12);
      element.classList.toggle(
        "primary-value-compact",
        Boolean(parts.numberTail),
      );
    }
    if (element.dataset.numberSignature === signature) {
      return;
    }
    element.dataset.numberSignature = signature;

    const amount = document.createElement("span");
    amount.className = "number-amount";
    if (parts.numberTail) {
      amount.classList.add("number-amount-grouped");

      const lead = document.createElement("span");
      lead.className = "number-lead";
      lead.textContent = `${options.prefix || ""}${parts.numberLead}`;

      const tail = document.createElement("span");
      tail.className = "number-tail";
      tail.textContent = parts.numberTail;

      amount.append(lead, tail);
    } else {
      amount.textContent = `${options.prefix || ""}${parts.number}`;
    }

    const children = [amount];
    if (unitText) {
      const unit = document.createElement("small");
      unit.className = "number-unit";
      unit.textContent = unitText;
      children.push(unit);
    }
    if (options.detail) {
      const detail = document.createElement("small");
      detail.className = "number-detail";
      detail.textContent = options.detail;
      children.push(detail);
    }

    element.replaceChildren(...children);
    const spokenNumber = `${options.prefix || ""}${
      parts.spokenNumber || parts.number
    }`;
    const spokenValue = [spokenNumber, unitText].filter(Boolean).join(" ");
    element.setAttribute("aria-label", spokenValue);
  }

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function getEventPoint(event) {
    const stageRect = els.floatingLayer.getBoundingClientRect();

    if (Number.isFinite(event.clientX) && Number.isFinite(event.clientY)) {
      return {
        x: event.clientX - stageRect.left,
        y: event.clientY - stageRect.top,
      };
    }

    return {
      x: stageRect.width / 2,
      y: stageRect.height / 2,
    };
  }

  function showFloatingText(x, y, text) {
    const pop = document.createElement("span");
    pop.className = "float-pop";
    pop.textContent = text;
    pop.style.left = `${x}px`;
    pop.style.top = `${y}px`;
    els.floatingLayer.append(pop);
    window.setTimeout(() => pop.remove(), 950);
  }

  function resizeCanvas() {
    const rect = els.canvas.getBoundingClientRect();
    const ratio = Math.min(2, window.devicePixelRatio || 1);
    els.canvas.width = Math.max(1, Math.floor(rect.width * ratio));
    els.canvas.height = Math.max(1, Math.floor(rect.height * ratio));
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function handleResize() {
    resizeCanvas();
    clampDecorationsToStage();
  }

  function initializeDecorations() {
    const width = els.canvas.clientWidth;
    const height = els.canvas.clientHeight;

    decorativeSprites = [
      ...els.swimmingTickets.map((element, index) =>
        createDecorativeSprite(element, "ticket", width, height, index),
      ),
      ...els.officeBugs.map((element, index) =>
        createDecorativeSprite(element, "bug", width, height, index),
      ),
    ];

    for (const sprite of decorativeSprites) {
      positionDecorativeSprite(sprite);
    }
  }

  function createDecorativeSprite(element, type, width, height, index) {
    const isTicket = type === "ticket";
    const spriteWidth = isTicket ? 62 : 14;
    const spriteHeight = isTicket ? 42 : 19;
    const angle = randomBetween(0, Math.PI * 2);
    const speed = isTicket ? randomBetween(18, 42) : randomBetween(14, 30);

    return {
      element,
      type,
      width: spriteWidth,
      height: spriteHeight,
      x: randomBetween(0, Math.max(1, width - spriteWidth)),
      y: randomBetween(0, Math.max(1, height - spriteHeight)),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      targetVx: Math.cos(angle) * speed,
      targetVy: Math.sin(angle) * speed,
      changeIn: randomBetween(0.6, 3.2) + index * 0.08,
      pauseRemaining: 0,
      squashed: false,
      age: randomBetween(0, 20),
      phase: randomBetween(0, Math.PI * 2),
    };
  }

  function updateDecorations(delta) {
    if (!decorativeSprites.length || reduceMotion) {
      return;
    }

    const stageWidth = els.canvas.clientWidth;
    const stageHeight = els.canvas.clientHeight;

    for (const sprite of decorativeSprites) {
      if (sprite.squashed) {
        continue;
      }

      sprite.age += delta;
      sprite.changeIn -= delta;

      if (sprite.type === "bug" && sprite.pauseRemaining > 0) {
        sprite.pauseRemaining -= delta;
        positionDecorativeSprite(sprite);
        continue;
      }

      if (sprite.changeIn <= 0) {
        chooseNewDecorativeCourse(sprite);
      }

      const steering = sprite.type === "ticket" ? 0.7 : 2.8;
      const blend = Math.min(1, delta * steering);
      sprite.vx += (sprite.targetVx - sprite.vx) * blend;
      sprite.vy += (sprite.targetVy - sprite.vy) * blend;
      sprite.x += sprite.vx * delta;
      sprite.y += sprite.vy * delta;

      bounceDecorativeSprite(sprite, stageWidth, stageHeight);
      positionDecorativeSprite(sprite);
    }
  }

  function chooseNewDecorativeCourse(sprite) {
    if (sprite.type === "bug" && Math.random() < 0.28) {
      sprite.pauseRemaining = randomBetween(0.5, 2.2);
      sprite.changeIn = sprite.pauseRemaining + randomBetween(0.5, 1.5);
      return;
    }

    const angle = randomBetween(0, Math.PI * 2);
    const speed =
      sprite.type === "ticket" ? randomBetween(18, 48) : randomBetween(14, 34);
    sprite.targetVx = Math.cos(angle) * speed;
    sprite.targetVy = Math.sin(angle) * speed;
    sprite.changeIn =
      sprite.type === "ticket" ? randomBetween(1.8, 5.2) : randomBetween(0.8, 3.6);
  }

  function bounceDecorativeSprite(sprite, stageWidth, stageHeight) {
    const maxX = Math.max(0, stageWidth - sprite.width);
    const maxY = Math.max(0, stageHeight - sprite.height);

    if (sprite.x <= 0 || sprite.x >= maxX) {
      sprite.x = Math.min(maxX, Math.max(0, sprite.x));
      sprite.vx *= -1;
      sprite.targetVx = Math.sign(sprite.vx || 1) * Math.abs(sprite.targetVx || sprite.vx);
      sprite.changeIn = Math.max(sprite.changeIn, 0.7);
    }

    if (sprite.y <= 0 || sprite.y >= maxY) {
      sprite.y = Math.min(maxY, Math.max(0, sprite.y));
      sprite.vy *= -1;
      sprite.targetVy = Math.sign(sprite.vy || 1) * Math.abs(sprite.targetVy || sprite.vy);
      sprite.changeIn = Math.max(sprite.changeIn, 0.7);
    }
  }

  function clampDecorationsToStage() {
    const stageWidth = els.canvas.clientWidth;
    const stageHeight = els.canvas.clientHeight;

    for (const sprite of decorativeSprites) {
      sprite.x = Math.min(Math.max(0, stageWidth - sprite.width), Math.max(0, sprite.x));
      sprite.y = Math.min(Math.max(0, stageHeight - sprite.height), Math.max(0, sprite.y));
      positionDecorativeSprite(sprite);
    }
  }

  function positionDecorativeSprite(sprite) {
    let rotation;

    if (sprite.type === "bug") {
      rotation = (Math.atan2(sprite.vy, sprite.vx) * 180) / Math.PI + 90;
    } else {
      const driftTilt = Math.max(-16, Math.min(16, sprite.vy * 0.35));
      rotation = driftTilt + Math.sin(sprite.age * 1.7 + sprite.phase) * 4;
    }

    sprite.element.style.transform =
      `translate3d(${sprite.x.toFixed(1)}px, ${sprite.y.toFixed(1)}px, 0) ` +
      `rotate(${rotation.toFixed(1)}deg)`;
  }

  function spawnBurst(x, y, amount) {
    const count = Math.min(34, 12 + Math.floor(Math.log2(Math.max(1, amount)) * 3));
    const colors = ["#f5f0df", "#f2c14e", "#58c6a7", "#e05d5d"];

    for (let index = 0; index < count; index += 1) {
      const angle = randomBetween(-Math.PI, 0);
      const speed = randomBetween(120, 360);
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed + randomBetween(-80, 80),
        vy: Math.sin(angle) * speed - randomBetween(30, 180),
        gravity: randomBetween(360, 640),
        age: 0,
        life: randomBetween(0.55, 0.95),
        width: randomBetween(9, 16),
        height: randomBetween(6, 11),
        rotation: randomBetween(-0.5, 0.5),
        spin: randomBetween(-5, 5),
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: "confetti",
      });
    }
  }

  function spawnTicketRain(originX, amount) {
    if (reduceMotion) {
      return;
    }

    const width = els.canvas.clientWidth;
    const count = Math.min(10, 3 + Math.floor(Math.log2(Math.max(1, amount))));
    for (let index = 0; index < count; index += 1) {
      particles.push({
        x: Math.min(width - 16, Math.max(16, originX + randomBetween(-190, 190))),
        y: randomBetween(-70, -16),
        vx: randomBetween(-34, 34),
        vy: randomBetween(85, 170),
        gravity: randomBetween(55, 110),
        age: -index * 0.045,
        life: randomBetween(1.7, 2.5),
        width: randomBetween(17, 25),
        height: randomBetween(11, 16),
        rotation: randomBetween(-0.7, 0.7),
        spin: randomBetween(-2.4, 2.4),
        color: Math.random() < 0.22 ? "#f2c14e" : "#f5f0df",
        shape: "ticket",
      });
    }
  }

  function updateParticles(delta) {
    const width = els.canvas.clientWidth;
    const height = els.canvas.clientHeight;
    ctx.clearRect(0, 0, width, height);

    particles = particles.filter((particle) => {
      particle.age += delta;
      if (particle.age < 0) {
        return true;
      }
      if (particle.age >= particle.life) {
        return false;
      }

      particle.vy += particle.gravity * delta;
      particle.x += particle.vx * delta;
      particle.y += particle.vy * delta;
      particle.rotation += particle.spin * delta;

      const alpha = 1 - particle.age / particle.life;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      ctx.fillStyle = particle.color;
      ctx.fillRect(-particle.width / 2, -particle.height / 2, particle.width, particle.height);
      ctx.fillStyle = "rgba(16, 18, 17, 0.52)";
      if (particle.shape === "ticket") {
        ctx.fillRect(-particle.width * 0.28, -particle.height * 0.22, particle.width * 0.56, 1.5);
        ctx.fillRect(-particle.width * 0.28, particle.height * 0.08, particle.width * 0.38, 1.5);
        ctx.fillStyle = "#1f8a70";
        ctx.fillRect(particle.width * 0.16, particle.height * 0.04, particle.width * 0.18, 2);
      } else {
        ctx.fillRect(-particle.width / 3, -1, particle.width * 0.66, 2);
      }
      ctx.restore();

      return particle.y < height + 60 && particle.x > -80 && particle.x < width + 80;
    });
  }
})();
