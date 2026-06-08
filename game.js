(() => {
  const STORAGE_KEY = "ticket-clicker-state-v1";
  const MAX_OFFLINE_SECONDS = 60 * 60 * 8;
  const PRIMARY_COMPACT_THRESHOLD = 1000000000000;

  const upgradeDefs = [
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

  const achievementDefs = [
    {
      id: "first_close",
      name: "First Close",
      description: "Resolve 1 ticket.",
      isUnlocked: () => state.totalResolved >= 1,
    },
    {
      id: "procurement_started",
      name: "Procurement Started",
      description: "Buy your first upgrade.",
      isUnlocked: () => Object.values(state.upgrades).some((count) => count > 0),
    },
    {
      id: "queue_tamer",
      name: "Queue Tamer",
      description: "Resolve 100 total tickets.",
      isUnlocked: () => state.totalResolved >= 100,
    },
    {
      id: "first_automation",
      name: "First Automation",
      description: "Reach 10 tickets per second.",
      isUnlocked: () => getTicketsPerSecond() >= 10,
    },
    {
      id: "inbox_zeroish",
      name: "Inbox Zero-ish",
      description: "Clear the open queue after closing 50 tickets.",
      isUnlocked: () => state.totalResolved >= 50 && state.openTickets < 1,
    },
    {
      id: "incident_commander",
      name: "Incident Commander",
      description: "Resolve 1,000 total tickets.",
      isUnlocked: () => state.totalResolved >= 1000,
    },
    {
      id: "script_whisperer",
      name: "Script Whisperer",
      description: "Own 5 auto-triage scripts.",
      isUnlocked: () => owned("auto_triage") >= 5,
    },
    {
      id: "major_release",
      name: "Major Release",
      description: "Resolve 25,000 total tickets.",
      isUnlocked: () => state.totalResolved >= 25000,
    },
  ];

  const incidentDefs = [
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
      amount: 14,
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

  const numberFormat = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  });
  const compactFormat = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  });
  const primaryNumberFormat = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  });
  const primaryRateFormat = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
  });

  const els = {
    resolved: document.getElementById("resolvedValue"),
    total: document.getElementById("totalValue"),
    tps: document.getElementById("tpsValue"),
    queue: document.getElementById("queueValue"),
    sla: document.getElementById("slaValue"),
    bonus: document.getElementById("bonusValue"),
    heatMeter: document.getElementById("heatMeterFill"),
    clickPower: document.getElementById("clickPowerLabel"),
    ticketButton: document.getElementById("ticketButton"),
    upgradeList: document.getElementById("upgradeList"),
    achievementList: document.getElementById("achievementList"),
    logList: document.getElementById("logList"),
    saveButton: document.getElementById("saveButton"),
    resetButton: document.getElementById("resetButton"),
    saveStatus: document.getElementById("saveStatus"),
    floatingLayer: document.getElementById("floatingTextLayer"),
    canvas: document.getElementById("particleCanvas"),
    swimmingTickets: [...document.querySelectorAll(".swimming-ticket")],
    officeBugs: [...document.querySelectorAll(".office-bug")],
  };

  const ctx = els.canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let state = loadState();
  let lastFrame = performance.now();
  let renderAccumulator = 0;
  let saveAccumulator = 0;
  let statusTimer = 0;
  let particles = [];
  let decorativeSprites = [];

  if (!state.log.length) {
    state.log.push({
      message: "Shift started. The queue is already pretending it is fine.",
      type: "success",
      time: Date.now(),
    });
  }

  applyOfflineProgress();
  checkAchievements();
  resizeCanvas();
  initializeDecorations();
  render();

  els.ticketButton.addEventListener("click", handleTicketClick);
  els.upgradeList.addEventListener("click", handleUpgradeClick);
  els.saveButton.addEventListener("click", () => saveState(true));
  els.resetButton.addEventListener("click", resetGame);
  window.addEventListener("resize", handleResize);
  window.addEventListener("beforeunload", () => saveState(false));
  requestAnimationFrame(frame);

  function createDefaultState() {
    return {
      resolved: 0,
      totalResolved: 0,
      totalSpent: 0,
      openTickets: 24,
      manualClicks: 0,
      upgrades: Object.fromEntries(upgradeDefs.map((upgrade) => [upgrade.id, 0])),
      achievements: {},
      log: [],
      lastSave: Date.now(),
      nextIncidentAt: Date.now() + randomBetween(28000, 52000),
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
        log: Array.isArray(saved.log) ? saved.log.slice(0, 6) : [],
      };

      merged.resolved = cleanNumber(merged.resolved);
      merged.totalResolved = cleanNumber(merged.totalResolved);
      merged.totalSpent = cleanNumber(merged.totalSpent);
      merged.openTickets = Math.max(0, cleanNumber(merged.openTickets));
      merged.manualClicks = Math.max(0, cleanNumber(merged.manualClicks));
      merged.lastSave = Number.isFinite(merged.lastSave) ? merged.lastSave : Date.now();
      merged.nextIncidentAt = Number.isFinite(merged.nextIncidentAt)
        ? merged.nextIncidentAt
        : Date.now() + randomBetween(28000, 52000);
      merged.nextMilestoneIndex = Number.isFinite(merged.nextMilestoneIndex)
        ? merged.nextMilestoneIndex
        : 0;

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

  function frame(now) {
    const delta = Math.min(0.25, (now - lastFrame) / 1000);
    lastFrame = now;

    tick(delta);
    updateParticles(delta);
    updateDecorations(delta);

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
    state.openTickets += incoming;

    const passive = getTicketsPerSecond() * delta;
    if (passive > 0) {
      addResolved(passive);
    }

    if (Date.now() >= state.nextIncidentAt) {
      triggerIncident();
    }

    checkMilestones();
    checkAchievements();
  }

  function handleTicketClick(event) {
    const clickPower = getClickPower();
    const point = getEventPoint(event);

    state.manualClicks += 1;
    addResolved(clickPower);
    spawnBurst(point.x, point.y, clickPower);
    showFloatingText(point.x, point.y, `+${formatNumber(clickPower)}`);
    checkMilestones();
    checkAchievements();
    render();
  }

  function handleUpgradeClick(event) {
    const button = event.target.closest(".upgrade-item");
    if (!button) {
      return;
    }

    buyUpgrade(button.dataset.upgradeId);
  }

  function buyUpgrade(upgradeId) {
    const upgrade = upgradeDefs.find((item) => item.id === upgradeId);
    if (!upgrade) {
      return;
    }

    const cost = getUpgradeCost(upgrade);
    if (state.resolved < cost) {
      setSaveStatus("Need more tickets");
      return;
    }

    state.resolved -= cost;
    state.totalSpent += cost;
    state.upgrades[upgrade.id] = owned(upgrade.id) + 1;
    addLog(`Procurement approved: ${upgrade.name}.`, "success");
    checkAchievements();
    saveState(false);
    render();
  }

  function addResolved(amount) {
    state.resolved += amount;
    state.totalResolved += amount;
    state.openTickets = Math.max(0, state.openTickets - amount);
  }

  function owned(upgradeId) {
    return state.upgrades[upgradeId] || 0;
  }

  function getUpgradeCost(upgrade) {
    return Math.ceil(upgrade.baseCost * Math.pow(upgrade.growth, owned(upgrade.id)));
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

    return flat * multiplier * getProductivityMultiplier();
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

    return flat * multiplier * getProductivityMultiplier();
  }

  function getIncomingRate() {
    const scale = Math.sqrt(Math.max(0, state.totalResolved)) / 220;
    const queueDrag = Math.min(1.8, state.openTickets / 1800);
    return Math.min(18, 0.22 + scale + queueDrag);
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

    state.openTickets += amount;
    state.lastIncidentLabel = incident.label;
    state.nextIncidentAt = Date.now() + randomBetween(30000, 70000);
    addLog(`${incident.label} +${formatNumber(amount)} open tickets.`, "warning");
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
        addLog(`Achievement unlocked: ${achievement.name}.`, "success");
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
  }

  function applyOfflineProgress() {
    const secondsAway = Math.min(MAX_OFFLINE_SECONDS, Math.max(0, (Date.now() - state.lastSave) / 1000));
    const passive = getTicketsPerSecond();

    if (secondsAway < 20 || passive <= 0) {
      state.lastSave = Date.now();
      return;
    }

    const earned = passive * secondsAway * 0.65;
    const incoming = getIncomingRate() * secondsAway;
    state.openTickets += incoming;
    addResolved(earned);
    addLog(`Offline automation closed ${formatNumber(earned)} tickets.`, "success");
    state.lastSave = Date.now();
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
    particles = [];
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
    const tps = getTicketsPerSecond();
    const sla = getSlaStatus();

    setPrimaryMetric(els.resolved, formatPrimaryNumber(state.resolved));
    els.total.textContent = formatNumber(state.totalResolved);
    setPrimaryMetric(els.tps, formatPrimaryRate(tps));
    els.queue.textContent = formatNumber(state.openTickets);
    els.sla.textContent = sla.label;
    els.bonus.textContent = `${Math.round(getAchievementBonus() * 100)}%`;
    els.heatMeter.style.width = `${Math.min(100, Math.max(8, sla.width))}%`;
    els.heatMeter.style.background = sla.color;
    els.clickPower.textContent = `+${formatRate(clickPower)} per click`;

    renderUpgrades();
    renderAchievements();
    renderLog();
  }

  function renderUpgrades() {
    const fragment = document.createDocumentFragment();

    for (const upgrade of upgradeDefs) {
      const cost = getUpgradeCost(upgrade);
      const count = owned(upgrade.id);
      const button = document.createElement("button");
      button.className = "upgrade-item";
      button.type = "button";
      button.dataset.upgradeId = upgrade.id;
      button.disabled = state.resolved < cost;
      button.setAttribute("aria-label", `Buy ${upgrade.name} for ${formatNumber(cost)} tickets`);

      const copy = document.createElement("span");
      copy.className = "upgrade-copy";

      const name = document.createElement("strong");
      name.textContent = upgrade.name;

      const description = document.createElement("span");
      description.textContent = upgrade.description;

      copy.append(name, description);

      const meta = document.createElement("span");
      meta.className = "upgrade-meta";

      const costNode = document.createElement("span");
      costNode.className = "upgrade-cost";
      costNode.textContent = formatNumber(cost);

      const ownedNode = document.createElement("span");
      ownedNode.className = "upgrade-owned";
      ownedNode.textContent = `Owned ${formatNumber(count)}`;

      meta.append(costNode, ownedNode);
      button.append(copy, meta);
      fragment.append(button);
    }

    els.upgradeList.replaceChildren(fragment);
  }

  function renderAchievements() {
    const fragment = document.createDocumentFragment();

    for (const achievement of achievementDefs) {
      const unlocked = Boolean(state.achievements[achievement.id]);
      const item = document.createElement("div");
      item.className = `achievement${unlocked ? " unlocked" : ""}`;

      const name = document.createElement("strong");
      name.textContent = unlocked ? achievement.name : "Locked";

      const description = document.createElement("span");
      description.textContent = achievement.description;

      item.append(name, description);
      fragment.append(item);
    }

    els.achievementList.replaceChildren(fragment);
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
    const clean = Math.max(0, cleanNumber(value));
    if (clean < 1000) {
      if (clean < 10 && clean % 1 !== 0) {
        return clean.toFixed(1);
      }
      return numberFormat.format(Math.floor(clean));
    }

    return compactFormat.format(clean);
  }

  function formatRate(value) {
    const clean = Math.max(0, cleanNumber(value));
    if (clean < 100) {
      return clean.toFixed(1).replace(/\.0$/, "");
    }
    return formatNumber(clean);
  }

  function formatPrimaryNumber(value) {
    const clean = Math.max(0, cleanNumber(value));
    if (clean < PRIMARY_COMPACT_THRESHOLD) {
      return primaryNumberFormat.format(Math.floor(clean));
    }
    return compactFormat.format(clean);
  }

  function formatPrimaryRate(value) {
    const clean = Math.max(0, cleanNumber(value));
    if (clean < PRIMARY_COMPACT_THRESHOLD) {
      return primaryRateFormat.format(clean);
    }
    return compactFormat.format(clean);
  }

  function setPrimaryMetric(element, text) {
    element.textContent = text;
    element.classList.toggle("primary-value-long", text.length > 9);
    element.classList.toggle("primary-value-extra-long", text.length > 12);
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
      });
    }
  }

  function updateParticles(delta) {
    const width = els.canvas.clientWidth;
    const height = els.canvas.clientHeight;
    ctx.clearRect(0, 0, width, height);

    particles = particles.filter((particle) => {
      particle.age += delta;
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
      ctx.fillRect(-particle.width / 3, -1, particle.width * 0.66, 2);
      ctx.restore();

      return particle.y < height + 60 && particle.x > -80 && particle.x < width + 80;
    });
  }
})();
