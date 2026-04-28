import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TrendingUp, Users, Zap, Target, Mail, MessageCircle, Smartphone, Send,
  Settings, ChevronRight, ArrowUpRight, ArrowDownRight, MoreHorizontal,
  Brain, Eye, Layers, Clock, CheckCircle2, AlertCircle, Copy, Edit3, Trash2,
  Play, Pause, X, Plus, Sparkles, MessageSquare, ChevronDown, ChevronUp, Send as SendIcon,
  Bell, Calendar, Megaphone, Filter, ArrowRight, Users2, MousePointer2, RotateCcw,
  BarChart3, Globe, Workflow, Split, PieChartIcon, Wand2
} from "lucide-react";

// Custom Modal Component
const Modal = ({ isOpen, onClose, title, description, children, actions }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/80" onClick={onClose} />
      <div className="relative z-50 bg-card border border-border rounded-lg shadow-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">{title}</h2>
            {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="py-4">
          {children}
        </div>

        {actions && (
          <div className="flex gap-3 justify-end pt-4 border-t border-border">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

// WebEngage-style Campaign Builder Modal
const CampaignBuilderModal = ({ isOpen, onClose, onCreate }: { isOpen: boolean; onClose: () => void; onCreate: () => void }) => {
  const [step, setStep] = useState(1);
  const [campaignName, setCampaignName] = useState("");
  const [selectedFunnel, setSelectedFunnel] = useState("TOFU");
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["Email"]);
  const [audienceType, setAudienceType] = useState("all");
  const [scheduleType, setScheduleType] = useState("now");
  const [aiGenerated, setAiGenerated] = useState(true);

  const channels = [
    { id: "Email", name: "Email", icon: Mail, color: "bg-blue-500", desc: "Rich HTML campaigns" },
    { id: "SMS", name: "SMS", icon: Smartphone, color: "bg-green-500", desc: "Text messages" },
    { id: "WhatsApp", name: "WhatsApp", icon: MessageCircle, color: "bg-emerald-500", desc: "Rich messaging" },
    { id: "Push", name: "Push", icon: Bell, color: "bg-purple-500", desc: "App notifications" },
    { id: "Messenger", name: "Messenger", icon: Send, color: "bg-indigo-500", desc: "Chat automation" },
  ];

  const funnelStages = [
    { id: "TOFU", name: "Top of Funnel", desc: "Awareness & Acquisition", icon: Users },
    { id: "MOFU", name: "Middle of Funnel", desc: "Consideration & Engagement", icon: Target },
    { id: "BOFU", name: "Bottom of Funnel", desc: "Conversion & Retention", icon: Zap },
  ];

  const audienceSegments = [
    { id: "all", name: "All Users", count: 12450, icon: Users2 },
    { id: "active", name: "Active Users", count: 8234, icon: Zap },
    { id: "engaged", name: "High Engagement", count: 3456, icon: Target },
    { id: "new", name: "New Users", count: 1890, icon: Users },
  ];

  const toggleChannel = (channelId: string) => {
    setSelectedChannels(prev =>
      prev.includes(channelId)
        ? prev.filter(c => c !== channelId)
        : [...prev, channelId]
    );
  };

  const handleCreate = () => {
    onCreate();
    setStep(1);
    setCampaignName("");
    setSelectedChannels(["Email"]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-50 bg-card border border-border rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Megaphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Create Campaign</h2>
                <p className="text-xs text-muted-foreground">Build omnichannel engagement journeys</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-2 mt-4">
            {[
              { num: 1, label: "Campaign" },
              { num: 2, label: "Audience" },
              { num: 3, label: "Channels" },
              { num: 4, label: "Schedule" },
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  step >= s.num ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                    step > s.num ? 'bg-green-500' : step === s.num ? 'bg-white/20' : 'bg-muted-foreground/20'
                  }`}>
                    {step > s.num ? <CheckCircle2 className="w-3 h-3" /> : s.num}
                  </div>
                  {s.label}
                </div>
                {idx < 3 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Campaign Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Campaign Name *</label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="e.g., Spring Sale 2024 - Cross-Channel"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-3">Funnel Stage *</label>
                <div className="grid grid-cols-3 gap-3">
                  {funnelStages.map((stage) => {
                    const Icon = stage.icon;
                    return (
                      <button
                        key={stage.id}
                        onClick={() => setSelectedFunnel(stage.id)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          selectedFunnel === stage.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-semibold text-foreground">{stage.name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{stage.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Campaign Goal</label>
                <div className="flex flex-wrap gap-2">
                  {["Drive Engagement", "Increase Conversions", "Reduce Churn", "Re-activation", "Onboarding"].map(goal => (
                    <button
                      key={goal}
                      className="px-4 py-2 rounded-full border border-border hover:border-primary hover:bg-primary/5 text-sm text-foreground transition-colors"
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Audience */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-foreground block mb-3">Select Audience Segment</label>
                <div className="grid grid-cols-2 gap-3">
                  {audienceSegments.map((segment) => {
                    const Icon = segment.icon;
                    return (
                      <button
                        key={segment.id}
                        onClick={() => setAudienceType(segment.id)}
                        className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                          audienceType === segment.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{segment.name}</p>
                          <p className="text-xs text-muted-foreground">{segment.count.toLocaleString()} users</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <Filter className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Advanced Filters</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Last Active: 7 days", "Engagement Score: >50", "Location: Any", "Device: Mobile"].map(filter => (
                    <span key={filter} className="px-3 py-1 rounded-full bg-card border border-border text-xs text-foreground">
                      {filter}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Channels */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-foreground block mb-3">Select Channels *</label>
                <div className="grid grid-cols-2 gap-3">
                  {channels.map((channel) => {
                    const Icon = channel.icon;
                    const isSelected = selectedChannels.includes(channel.id);
                    return (
                      <button
                        key={channel.id}
                        onClick={() => toggleChannel(channel.id)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg ${channel.color} flex items-center justify-center`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-foreground">{channel.name}</span>
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-primary" />}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{channel.desc}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* AI Content Generation */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">AI-Powered Content</p>
                      <p className="text-xs text-muted-foreground">Generate personalized messages for each channel</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setAiGenerated(!aiGenerated)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      aiGenerated ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                      aiGenerated ? 'left-7' : 'left-1'
                    }`} />
                  </button>
                </div>
              </div>

              {/* Journey Preview */}
              {selectedChannels.length > 1 && (
                <div className="p-4 rounded-xl bg-muted/30 border border-border">
                  <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Workflow className="w-4 h-4" />
                    Journey Orchestration
                  </p>
                  <div className="flex items-center gap-2">
                    {selectedChannels.map((channelId, idx) => {
                      const channel = channels.find(c => c.id === channelId);
                      if (!channel) return null;
                      const Icon = channel.icon;
                      return (
                        <div key={channelId} className="flex items-center gap-2">
                          <div className={`w-10 h-10 rounded-lg ${channel.color} flex items-center justify-center`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          {idx < selectedChannels.length - 1 && (
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Schedule */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-foreground block mb-3">When to Send?</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "now", name: "Send Now", desc: "Immediate delivery", icon: Play },
                    { id: "scheduled", name: "Schedule", desc: "Pick date & time", icon: Calendar },
                    { id: "triggered", name: "Triggered", desc: "Event-based", icon: MousePointer2 },
                  ].map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={() => setScheduleType(option.id)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          scheduleType === option.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Icon className={`w-6 h-6 mb-2 ${scheduleType === option.id ? 'text-primary' : 'text-muted-foreground'}`} />
                        <p className="font-semibold text-foreground">{option.name}</p>
                        <p className="text-xs text-muted-foreground">{option.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {scheduleType === "scheduled" && (
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <label className="text-sm font-semibold text-foreground block mb-2">Select Date & Time</label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground"
                  />
                </div>
              )}

              {scheduleType === "triggered" && (
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <label className="text-sm font-semibold text-foreground block mb-2">Trigger Event</label>
                  <select className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground">
                    <option>User Signup</option>
                    <option>Cart Abandonment</option>
                    <option>Inactive for 7 days</option>
                    <option>App Install</option>
                  </select>
                </div>
              )}

              {/* Campaign Summary */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20">
                <p className="text-sm font-semibold text-foreground mb-3">Campaign Summary</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium text-foreground">{campaignName || "Untitled"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Funnel:</span>
                    <span className="font-medium text-foreground">{selectedFunnel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Channels:</span>
                    <span className="font-medium text-foreground">{selectedChannels.join(", ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Audience:</span>
                    <span className="font-medium text-foreground">{audienceSegments.find(s => s.id === audienceType)?.count.toLocaleString()} users</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border bg-muted/30 flex items-center justify-between">
          <button
            onClick={step > 1 ? () => setStep(step - 1) : onClose}
            className="px-4 py-2 text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            {step > 1 ? "Back" : "Cancel"}
          </button>
          <div className="flex gap-3">
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && !campaignName}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleCreate}
                disabled={selectedChannels.length === 0}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Create Campaign
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const DripCampaignsTab = () => {
  const [selectedFunnel, setSelectedFunnel] = useState<"TOFU" | "MOFU" | "BOFU">("TOFU");
  const [selectedGoal, setSelectedGoal] = useState<string>("onboarding");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [activateOpen, setActivateOpen] = useState(false);
  const [activatedSequence, setActivatedSequence] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [customSequences, setCustomSequences] = useState<Record<string, any>>({});
  const [newSequence, setNewSequence] = useState({
    name: "",
    objective: "",
    duration: "7 days",
    funnel: "TOFU" as "TOFU" | "MOFU" | "BOFU",
    steps: [{ step: 1, channel: "Email", message: "", trigger: "", goal: "" }]
  });

  const dripSequences = {
    TOFU: {
      onboarding: {
        name: "Welcome & Awareness Sequence",
        objective: "Introduce brand, build trust, educate prospects",
        duration: "7 days",
        steps: [
          {
            step: 1,
            channel: "Email",
            message: "Welcome! Here's your free guide to [Topic]. No pitch, just value.",
            trigger: "Immediately after signup",
            goal: "Deliver value, establish expertise"
          },
          {
            step: 2,
            channel: "Push",
            message: "💡 Did you check your guide? Here's a quick tip to get started.",
            trigger: "2 days later (if not engaged)",
            goal: "Drive content consumption"
          },
          {
            step: 3,
            channel: "WhatsApp",
            message: "Hey! Saw you downloaded our guide. What challenges are you facing with [Topic]? Reply and I'll share relevant resources 🤝",
            trigger: "3 days later",
            goal: "Start conversation, gather intent"
          },
          {
            step: 4,
            channel: "Email",
            message: "3 ways others like you solved [Pain Point] - case studies inside.",
            trigger: "5 days later",
            goal: "Social proof, move to consideration"
          },
          {
            step: 5,
            channel: "SMS",
            message: "Quick question: What's your biggest goal this quarter? Your answer helps us send better content. Reply STOP to opt out.",
            trigger: "7 days later",
            goal: "Qualify lead, segment for MOFU"
          }
        ]
      },
      engagement: {
        name: "Content Engagement Booster",
        objective: "Increase content consumption and site engagement",
        duration: "5 days",
        steps: [
          {
            step: 1,
            channel: "Push",
            message: "🔥 Trending now: 5 strategies that doubled engagement for [Industry] leaders",
            trigger: "User inactive for 2 days",
            goal: "Re-engagement with trending content"
          },
          {
            step: 2,
            channel: "Email",
            message: "Personalized reading list based on your interests. 3 must-read articles this week.",
            trigger: "1 day later",
            goal: "Personalized content delivery"
          },
          {
            step: 3,
            channel: "WhatsApp",
            message: "Saw you checked out our blog! What topic would you like us to cover next? Your feedback shapes our content 📊",
            trigger: "After blog view",
            goal: "Two-way engagement, feedback loop"
          },
          {
            step: 4,
            channel: "Email",
            message: "Exclusive: Early access to our upcoming industry report. Be the first to know.",
            trigger: "3 days later",
            goal: "Build anticipation, capture interest"
          }
        ]
      },
      education: {
        name: "Educational Nurture Series",
        objective: "Educate prospects on industry topics and challenges",
        duration: "10 days",
        steps: [
          {
            step: 1,
            channel: "Email",
            message: "The Complete Guide to [Industry]: Everything you need to know in 2024",
            trigger: "Day 0",
            goal: "Comprehensive education"
          },
          {
            step: 2,
            channel: "Push",
            message: "📚 Day 2: Understanding [Key Concept] - quick 2-min read",
            trigger: "Day 2",
            goal: "Micro-learning, maintain momentum"
          },
          {
            step: 3,
            channel: "Email",
            message: "Video: How top performers approach [Topic] differently",
            trigger: "Day 4",
            goal: "Video engagement, deeper education"
          },
          {
            step: 4,
            channel: "WhatsApp",
            message: "Quick poll: What's your biggest challenge with [Topic]? A) Time B) Budget C) Knowledge D) Tools",
            trigger: "Day 6",
            goal: "Interactive engagement, data collection"
          },
          {
            step: 5,
            channel: "Email",
            message: "Based on common challenges, here's a toolkit to help you overcome [Top Challenge]",
            trigger: "Day 8",
            goal: "Solution-oriented content"
          },
          {
            step: 6,
            channel: "SMS",
            message: "Final tip: Join 10K+ professionals who get our weekly insights. Reply YES to subscribe.",
            trigger: "Day 10",
            goal: "Subscription conversion"
          }
        ]
      }
    },
    MOFU: {
      conversion: {
        name: "Product-Focused Nurture",
        objective: "Showcase product value, drive demo bookings",
        duration: "7 days",
        steps: [
          {
            step: 1,
            channel: "Email",
            message: "See how [Company] solved [Pain Point] with our platform - 3-min case study video",
            trigger: "User viewed pricing page",
            goal: "Address objections with proof"
          },
          {
            step: 2,
            channel: "Push",
            message: "⚡ Feature spotlight: The automation that saves 10 hours/week",
            trigger: "1 day later",
            goal: "Feature awareness"
          },
          {
            step: 3,
            channel: "WhatsApp",
            message: "Hi! Noticed you're exploring our solutions. Want to see a personalized demo? Takes just 15 mins. Book here 👉 [Link]",
            trigger: "2 days later",
            goal: "Demo booking CTA"
          },
          {
            step: 4,
            channel: "Email",
            message: "ROI Calculator: See your potential savings in 60 seconds",
            trigger: "3 days later (if no demo booked)",
            goal: "Quantify value, reduce friction"
          },
          {
            step: 5,
            channel: "SMS",
            message: "Last chance: 20% off your first 3 months if you start this week. Offer expires Friday. [Link]",
            trigger: "5 days later",
            goal: "Urgency, limited-time offer"
          }
        ]
      },
      engagement: {
        name: "Feature Adoption Sequence",
        objective: "Drive deeper product engagement and feature usage",
        duration: "6 days",
        steps: [
          {
            step: 1,
            channel: "Email",
            message: "Unlock the power of [Feature]: Your step-by-step activation guide",
            trigger: "User signed up but inactive",
            goal: "Feature activation"
          },
          {
            step: 2,
            channel: "Push",
            message: "🎯 Pro tip: This setting boosts productivity by 40%",
            trigger: "1 day later",
            goal: "Quick win demonstration"
          },
          {
            step: 3,
            channel: "WhatsApp",
            message: "Stuck on setup? I can walk you through it in 5 mins. Just reply HELP 💬",
            trigger: "2 days later (if feature not used)",
            goal: "Offer support, reduce friction"
          },
          {
            step: 4,
            channel: "Email",
            message: "See what others built: 5 inspiring use cases from [Industry] customers",
            trigger: "3 days later",
            goal: "Inspiration, social proof"
          },
          {
            step: 5,
            channel: "Email",
            message: "You're missing out: Users who activate [Feature] see 3x better results",
            trigger: "5 days later",
            goal: "FOMO, drive activation"
          }
        ]
      },
      reactivation: {
        name: "Win-Back Campaign",
        objective: "Re-engage inactive users in MOFU stage",
        duration: "5 days",
        steps: [
          {
            step: 1,
            channel: "Email",
            message: "We miss you! Here's what's new since you last visited",
            trigger: "Inactive for 14 days",
            goal: "Re-engagement with updates"
          },
          {
            step: 2,
            channel: "Push",
            message: "👋 Come back! Your account has new features waiting",
            trigger: "2 days later",
            goal: "Feature-driven return"
          },
          {
            step: 3,
            channel: "WhatsApp",
            message: "Hey! What made you pause? Reply with your reason: 1) Too expensive 2) Too complex 3) Not right time 4) Found alternative",
            trigger: "3 days later",
            goal: "Understand churn reasons"
          },
          {
            step: 4,
            channel: "SMS",
            message: "Special comeback offer: 30% off for 2 months. Valid 48 hours. [Link]",
            trigger: "4 days later",
            goal: "Incentive-driven return"
          }
        ]
      }
    },
    BOFU: {
      conversion: {
        name: "Closing Sequence",
        objective: "Convert hot leads to paying customers",
        duration: "5 days",
        steps: [
          {
            step: 1,
            channel: "Email",
            message: "[Name], you're one step away. Complete your purchase in 2 clicks.",
            trigger: "Cart abandonment (immediately)",
            goal: "Immediate recovery"
          },
          {
            step: 2,
            channel: "SMS",
            message: "Forgot something? Your cart is waiting + free shipping ends tonight! [Link]",
            trigger: "1 hour later",
            goal: "Urgency with benefit"
          },
          {
            step: 3,
            channel: "WhatsApp",
            message: "Hi [Name]! I can offer you an extra 10% off if you complete your order today. Interested? Reply YES 🎁",
            trigger: "6 hours later",
            goal: "Personal discount offer"
          },
          {
            step: 4,
            channel: "Push",
            message: "⏰ Final hours: Your items are selling out. Secure yours now!",
            trigger: "12 hours later",
            goal: "Scarcity, final push"
          },
          {
            step: 5,
            channel: "Email",
            message: "Last call: Your cart expires in 2 hours. Here's 15% off to help decide: CODE15",
            trigger: "22 hours later",
            goal: "Final discount, close sale"
          }
        ]
      },
      demo: {
        name: "Demo Booking to Close",
        objective: "Convert demo bookings to closed deals",
        duration: "7 days",
        steps: [
          {
            step: 1,
            channel: "Email",
            message: "Your demo is confirmed for [Date/Time]. Here's what we'll cover + calendar invite.",
            trigger: "Immediately after booking",
            goal: "Confirmation, set expectations"
          },
          {
            step: 2,
            channel: "SMS",
            message: "Reminder: Your demo is tomorrow at [Time]. Need to reschedule? Reply RESCHEDULE",
            trigger: "1 day before",
            goal: "Reduce no-shows"
          },
          {
            step: 3,
            channel: "WhatsApp",
            message: "Quick prep: What's your #1 goal for tomorrow's demo? I'll tailor the presentation 🎯",
            trigger: "2 hours before",
            goal: "Personalization, show prep"
          },
          {
            step: 4,
            channel: "Email",
            message: "Thanks for your time today! Here's your custom proposal + next steps.",
            trigger: "1 hour after demo",
            goal: "Follow-up with proposal"
          },
          {
            step: 5,
            channel: "Email",
            message: "Case study: How [Similar Company] achieved [Result] in 30 days",
            trigger: "2 days later (if no response)",
            goal: "Social proof, address hesitation"
          },
          {
            step: 6,
            channel: "SMS",
            message: "Final call: Your proposal expires Friday. Questions? Call me: [Phone]. Ready to start? Reply GO",
            trigger: "4 days later",
            goal: "Close the deal"
          }
        ]
      },
      retention: {
        name: "Customer Retention & Upsell",
        objective: "Retain customers and drive upsells",
        duration: "Ongoing",
        steps: [
          {
            step: 1,
            channel: "Email",
            message: "Welcome to the family! Here's your onboarding checklist for week 1",
            trigger: "Immediately after purchase",
            goal: "Successful onboarding"
          },
          {
            step: 2,
            channel: "Push",
            message: "🎉 Milestone unlocked! You've completed your first [Action]. Here's what's next.",
            trigger: "After first key action",
            goal: "Celebrate progress, guide next steps"
          },
          {
            step:  3,
            channel: "WhatsApp",
            message: "Hi! How's your first week going? Any questions I can help with? Reply here anytime 📞",
            trigger: "7 days after purchase",
            goal: "Check-in, offer support"
          },
          {
            step: 4,
            channel: "Email",
            message: "You're a power user now! Unlock [Advanced Feature] to 2x your results",
            trigger: "30 days after purchase",
            goal: "Upsell to premium"
          },
          {
            step: 5,
            channel: "Email",
            message: "Your monthly report: Here's what you achieved this month + tips for next month",
            trigger: "Monthly",
            goal: "Value reinforcement, engagement"
          }
        ]
      }
    }
  };

  const currentSequence = dripSequences[selectedFunnel][selectedGoal as keyof typeof dripSequences["TOFU"]];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Workflow className="w-6 h-6 text-primary" />
            Lifecycle Drip Campaigns
          </h2>
          <p className="text-muted-foreground mt-1">AI-powered sequences for every funnel stage</p>
        </div>
        <button 
          onClick={() => setCreateOpen(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Custom Sequence
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 p-4 bg-card rounded-lg border border-border">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">Funnel Stage:</span>
          <div className="flex gap-2">
            {(["TOFU", "MOFU", "BOFU"] as const).map((stage) => (
              <button
                key={stage}
                onClick={() => setSelectedFunnel(stage)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedFunnel === stage
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">Goal:</span>
          <select
            value={selectedGoal}
            onChange={(e) => setSelectedGoal(e.target.value)}
            className="px-3 py-1.5 bg-muted border border-border rounded-lg text-sm text-foreground"
          >
            {Object.keys(dripSequences[selectedFunnel]).map((goal) => (
              <option key={goal} value={goal}>
                {goal.charAt(0).toUpperCase() + goal.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sequence Card */}
      {currentSequence && (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          {/* Sequence Header */}
          <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-foreground">{currentSequence.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{currentSequence.objective}</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Clock className="w-4 h-4" />
                {currentSequence.duration}
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="p-6">
            <div className="space-y-4">
              {currentSequence.steps.map((step, idx) => (
                <div key={idx} className="relative">
                  {/* Connector line */}
                  {idx < currentSequence.steps.length - 1 && (
                    <div className="absolute left-6 top-14 w-0.5 h-8 bg-border" />
                  )}
                  
                  <div className="flex gap-4">
                    {/* Step number */}
                    <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-primary">{step.step}</span>
                    </div>
                    
                    {/* Step content */}
                    <div className="flex-1 p-4 rounded-xl border border-border bg-muted/30 hover:border-primary/30 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                            step.channel === "Email" ? "bg-blue-500/20 text-blue-600" :
                            step.channel === "SMS" ? "bg-green-500/20 text-green-600" :
                            step.channel === "WhatsApp" ? "bg-emerald-500/20 text-emerald-600" :
                            step.channel === "Push" ? "bg-purple-500/20 text-purple-600" :
                            "bg-orange-500/20 text-orange-600"
                          }`}>
                            {step.channel}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {step.trigger}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-foreground font-medium mb-2">{step.message}</p>
                      
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-primary" />
                        <span className="text-xs text-muted-foreground">Goal: {step.goal}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 border-t border-border bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Auto-optimized by AI
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                Personalization enabled
              </span>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setPreviewOpen(true)}
                className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
              >
                Preview Flow
              </button>
              <button 
                onClick={() => setActivateOpen(true)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                {activatedSequence === currentSequence?.name ? "Activated" : "Activate Sequence"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Templates Grid */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">Other Templates</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(dripSequences).flatMap(([funnel, goals]) =>
            Object.entries(goals).map(([goal, sequence]) => (
              <button
                key={`${funnel}-${goal}`}
                onClick={() => {
                  setSelectedFunnel(funnel as "TOFU" | "MOFU" | "BOFU");
                  setSelectedGoal(goal);
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedFunnel === funnel && selectedGoal === goal
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 bg-card"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    funnel === "TOFU" ? "bg-blue-500/20 text-blue-600" :
                    funnel === "MOFU" ? "bg-orange-500/20 text-orange-600" :
                    "bg-green-500/20 text-green-600"
                  }`}>
                    {funnel}
                  </span>
                  <span className="text-xs text-muted-foreground">{sequence.duration}</span>
                </div>
                <p className="font-semibold text-foreground text-sm">{sequence.name}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{sequence.objective}</p>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Preview Flow Modal */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/60" onClick={() => setPreviewOpen(false)} />
          <div className="relative z-50 bg-card border border-border rounded-xl shadow-2xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  Visual Journey Preview
                </h3>
                <p className="text-xs text-muted-foreground">See how your users will experience this sequence</p>
              </div>
              <button onClick={() => setPreviewOpen(false)} className="p-2 hover:bg-muted rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="relative">
                {currentSequence?.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 mb-6">
                    {idx < currentSequence.steps.length - 1 && (
                      <div className="absolute left-6 top-14 w-0.5 h-16 bg-gradient-to-b from-primary to-primary/20" />
                    )}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="font-bold text-white">{step.step}</span>
                    </div>
                    <div className="flex-1 p-4 rounded-xl border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          step.channel === "Email" ? "bg-blue-500" :
                          step.channel === "SMS" ? "bg-green-500" :
                          step.channel === "WhatsApp" ? "bg-emerald-500" :
                          step.channel === "Push" ? "bg-purple-500" :
                          "bg-orange-500"
                        }`}>
                          {step.channel === "Email" && <Mail className="w-4 h-4 text-white" />}
                          {step.channel === "SMS" && <Smartphone className="w-4 h-4 text-white" />}
                          {step.channel === "WhatsApp" && <MessageCircle className="w-4 h-4 text-white" />}
                          {step.channel === "Push" && <Bell className="w-4 h-4 text-white" />}
                        </div>
                        <span className="font-semibold text-foreground">{step.channel}</span>
                        <span className="text-xs text-muted-foreground">• {step.trigger}</span>
                      </div>
                      <div className="p-3 bg-card rounded-lg border border-border/50 mb-2">
                        <p className="text-sm text-foreground">"{step.message}"</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-primary">
                        <Target className="w-3 h-3" />
                        {step.goal}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-6 py-4 border-t border-border bg-muted/30 flex justify-end gap-3">
              <button 
                onClick={() => setPreviewOpen(false)}
                className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setPreviewOpen(false);
                  setActivateOpen(true);
                }}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Activate Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activate Sequence Modal */}
      {activateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/60" onClick={() => setActivateOpen(false)} />
          <div className="relative z-50 bg-card border border-border rounded-xl shadow-2xl max-w-md w-full mx-4 p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {activatedSequence === currentSequence?.name ? "Sequence Activated!" : "Activate Sequence?"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {activatedSequence === currentSequence?.name 
                  ? `"${currentSequence?.name}" is now live and running.` 
                  : `Ready to launch "${currentSequence?.name}"? This will start sending messages to your audience.`}
              </p>
            </div>
            
            {activatedSequence !== currentSequence?.name && (
              <div className="bg-muted/50 rounded-lg p-4 mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Funnel:</span>
                  <span className="font-medium text-foreground">{selectedFunnel}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Steps:</span>
                  <span className="font-medium text-foreground">{currentSequence?.steps.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium text-foreground">{currentSequence?.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Channels:</span>
                  <span className="font-medium text-foreground">
                    {[...new Set(currentSequence?.steps.map(s => s.channel))].join(", ")}
                  </span>
                </div>
              </div>
            )}
            
            <div className="flex gap-3">
              <button 
                onClick={() => setActivateOpen(false)}
                className="flex-1 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
              >
                {activatedSequence === currentSequence?.name ? "Close" : "Cancel"}
              </button>
              {activatedSequence !== currentSequence?.name && (
                <button 
                  onClick={() => {
                    setActivatedSequence(currentSequence?.name || null);
                    console.log(`Sequence Activated: "${currentSequence?.name}" is now live!`);
                  }}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Activate Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Custom Sequence Modal */}
      {createOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/60" onClick={() => setCreateOpen(false)} />
          <div className="relative z-50 bg-card border border-border rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary" />
                  Create Custom Sequence
                </h3>
                <p className="text-xs text-muted-foreground">Build your own drip campaign step by step</p>
              </div>
              <button onClick={() => setCreateOpen(false)} className="p-2 hover:bg-muted rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-4">
                {/* Sequence Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Sequence Name *</label>
                    <input
                      type="text"
                      value={newSequence.name}
                      onChange={(e) => setNewSequence({ ...newSequence, name: e.target.value })}
                      placeholder="e.g., Product Launch Nurture"
                      className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Funnel Stage *</label>
                    <select
                      value={newSequence.funnel}
                      onChange={(e) => setNewSequence({ ...newSequence, funnel: e.target.value as "TOFU" | "MOFU" | "BOFU" })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm"
                    >
                      <option value="TOFU">TOFU - Awareness</option>
                      <option value="MOFU">MOFU - Consideration</option>
                      <option value="BOFU">BOFU - Conversion</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Objective</label>
                  <input
                    type="text"
                    value={newSequence.objective}
                    onChange={(e) => setNewSequence({ ...newSequence, objective: e.target.value })}
                    placeholder="What do you want to achieve with this sequence?"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm"
                  />
                </div>
                
                {/* Steps Builder */}
                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-medium text-foreground">Sequence Steps</label>
                    <button
                      onClick={() => setNewSequence({
                        ...newSequence,
                        steps: [...newSequence.steps, { step: newSequence.steps.length + 1, channel: "Email", message: "", trigger: "", goal: "" }]
                      })}
                      className="px-3 py-1.5 text-xs font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Add Step
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {newSequence.steps.map((step, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-border bg-muted/30">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-semibold text-foreground">Step {step.step}</span>
                          {newSequence.steps.length > 1 && (
                            <button
                              onClick={() => {
                                const updated = newSequence.steps.filter((_, i) => i !== idx);
                                setNewSequence({
                                  ...newSequence,
                                  steps: updated.map((s, i) => ({ ...s, step: i + 1 }))
                                });
                              }}
                              className="p-1 hover:bg-red-500/10 rounded text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div>
                            <label className="text-xs text-muted-foreground block mb-1">Channel</label>
                            <select
                              value={step.channel}
                              onChange={(e) => {
                                const updated = [...newSequence.steps];
                                updated[idx].channel = e.target.value;
                                setNewSequence({ ...newSequence, steps: updated });
                              }}
                              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm"
                            >
                              <option value="Email">Email</option>
                              <option value="SMS">SMS</option>
                              <option value="WhatsApp">WhatsApp</option>
                              <option value="Push">Push</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground block mb-1">Trigger</label>
                            <input
                              type="text"
                              value={step.trigger}
                              onChange={(e) => {
                                const updated = [...newSequence.steps];
                                updated[idx].trigger = e.target.value;
                                setNewSequence({ ...newSequence, steps: updated });
                              }}
                              placeholder="e.g., Day 1, After click"
                              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm"
                            />
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <label className="text-xs text-muted-foreground block mb-1">Message</label>
                          <textarea
                            value={step.message}
                            onChange={(e) => {
                              const updated = [...newSequence.steps];
                              updated[idx].message = e.target.value;
                              setNewSequence({ ...newSequence, steps: updated });
                            }}
                            placeholder="Enter your message here..."
                            rows={2}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm resize-none"
                          />
                        </div>
                        
                        <div>
                          <label className="text-xs text-muted-foreground block mb-1">Goal</label>
                          <input
                            type="text"
                            value={step.goal}
                            onChange={(e) => {
                              const updated = [...newSequence.steps];
                              updated[idx].goal = e.target.value;
                              setNewSequence({ ...newSequence, steps: updated });
                            }}
                            placeholder="e.g., Open email, Click link"
                            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-border bg-muted/30 flex justify-end gap-3">
              <button 
                onClick={() => setCreateOpen(false)}
                className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (newSequence.name && newSequence.objective) {
                    const goalKey = `custom_${Date.now()}`;
                    setCustomSequences({
                      ...customSequences,
                      [goalKey]: { ...newSequence, goal: goalKey }
                    });
                    setCreateOpen(false);
                    setNewSequence({
                      name: "",
                      objective: "",
                      duration: "7 days",
                      funnel: "TOFU",
                      steps: [{ step: 1, channel: "Email", message: "", trigger: "", goal: "" }]
                    });
                    console.log(`Custom Sequence Created: "${newSequence.name}" has been saved!`);
                  }
                }}
                disabled={!newSequence.name || !newSequence.objective}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Sequence
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface MetricCard {
  label: string;
  value: string;
  change: number;
  icon: React.ElementType;
  color: string;
}

interface Campaign {
  id: string;
  name: string;
  status: "active" | "draft" | "paused";
  channels: string[];
  funnel: string;
  engagement: number;
  conversions: number;
}

interface UserSegment {
  stage: string;
  count: number;
  percentage: number;
  trend: number;
}

interface UserWithMessage {
  id: string;
  name: string;
  email: string;
  funnelStage: string;
  lastActive: string;
  engagement: number;
  aiMessage: {
    subject: string;
    body: string;
    cta: string;
    channel: string;
  };
}

const MetricCard = ({ label, value, change, icon: Icon, color }: MetricCard) => {
  const isPositive = change >= 0;
  return (
    <div className="bg-card rounded-lg border border-border p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex items-center gap-1">
          {isPositive ? (
            <ArrowUpRight className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-xs font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {Math.abs(change)}%
          </span>
        </div>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
};

const CampaignCard = ({ 
  campaign, 
  onEdit, 
  onDuplicate, 
  onDelete, 
  onToggleStatus 
}: { 
  campaign: Campaign;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const statusColors = {
    active: "bg-green-500/10 text-green-600 border-green-200",
    draft: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
    paused: "bg-gray-500/10 text-gray-600 border-gray-200"
  };

  return (
    <div className="bg-card rounded-lg border border-border p-5 hover:border-primary/40 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-foreground">{campaign.name}</h4>
          <p className="text-xs text-muted-foreground mt-1">Funnel: {campaign.funnel}</p>
        </div>
        <div className="relative">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-muted rounded-md transition-colors"
          >
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-lg py-1 z-50 min-w-48">
              <button
                onClick={() => { onEdit(campaign.id); setMenuOpen(false); }}
                className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted flex items-center gap-2 transition-colors"
              >
                <Edit3 className="w-4 h-4" /> Edit Campaign
              </button>
              <button
                onClick={() => { onToggleStatus(campaign.id); setMenuOpen(false); }}
                className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted flex items-center gap-2 transition-colors"
              >
                {campaign.status === 'active' ? (
                  <><Pause className="w-4 h-4" /> Pause Campaign</>
                ) : (
                  <><Play className="w-4 h-4" /> Activate Campaign</>
                )}
              </button>
              <button
                onClick={() => { onDuplicate(campaign.id); setMenuOpen(false); }}
                className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted flex items-center gap-2 transition-colors"
              >
                <Copy className="w-4 h-4" /> Duplicate
              </button>
              <div className="border-t border-border my-1" />
              <button
                onClick={() => { onDelete(campaign.id); setMenuOpen(false); }}
                className="w-full px-4 py-2 text-left text-sm text-destructive hover:bg-destructive/10 flex items-center gap-2 transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {campaign.channels.map((channel) => (
          <span key={channel} className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
            {channel}
          </span>
        ))}
      </div>

      <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 border ${statusColors[campaign.status]}`}>
        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground">Engagement</p>
          <p className="text-xl font-bold text-foreground">{campaign.engagement}%</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Conversions</p>
          <p className="text-xl font-bold text-foreground">{campaign.conversions}%</p>
        </div>
      </div>
    </div>
  );
};

const FunnelStageCard = ({ stage, count, percentage, trend, onView }: UserSegment & { onView: () => void }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-5">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-foreground">{stage}</h4>
        <span className={`flex items-center gap-1 text-xs font-semibold ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend >= 0 ? '+' : ''}{trend}%
        </span>
      </div>
      <div className="mb-3">
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold text-foreground">{count}</p>
          <p className="text-sm text-muted-foreground">users</p>
        </div>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-primary rounded-full h-2 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2">{percentage}% of audience</p>
      <button
        onClick={onView}
        className="mt-4 w-full px-4 py-2 bg-primary/10 text-primary rounded-lg font-semibold text-sm hover:bg-primary/20 transition-colors flex items-center justify-center gap-2"
      >
        <Eye className="w-4 h-4" />
        View
      </button>
    </div>
  );
};

const TabButton = ({ active, onClick, icon: Icon, label }: { 
  active: boolean; 
  onClick: () => void; 
  icon: React.ElementType; 
  label: string;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all ${
      active 
        ? 'bg-primary text-primary-foreground' 
        : 'text-muted-foreground hover:bg-muted'
    }`}
  >
    <Icon className="w-4 h-4" />
    <span className="hidden sm:inline">{label}</span>
  </button>
);

const channelIcons: Record<string, React.ElementType> = {
  Email: Mail,
  SMS: Smartphone,
  WhatsApp: MessageCircle,
  Messenger: Send,
  Push: SendIcon
};

const UserRow = ({ user, onClick }: { user: UserWithMessage; onClick: () => void }) => {
  return (
    <div 
      className="border border-border rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-muted/40 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-sm font-semibold text-primary">
            {user.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <p className="font-semibold text-foreground">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Last Active</p>
          <p className="text-sm text-foreground">{user.lastActive}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Engagement</p>
          <p className="text-sm font-semibold text-primary">{user.engagement}%</p>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>
    </div>
  );
};

export default function Index() {
  const [activeTab, setActiveTab] = useState("overview");
  const [newCampaignOpen, setNewCampaignOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aiUseThisOpen, setAiUseThisOpen] = useState(false);
  const [aiCustomizeOpen, setAiCustomizeOpen] = useState(false);
  const [aiPreviewOpen, setAiPreviewOpen] = useState(false);
  const [selectedAiCampaign, setSelectedAiCampaign] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();

  const channels = [
    { id: "Email", label: "Email", icon: Mail },
    { id: "SMS", label: "SMS", icon: Smartphone },
    { id: "WhatsApp", label: "WhatsApp", icon: MessageCircle },
    { id: "Messenger", label: "Messenger", icon: Send },
    { id: "Push", label: "Push", icon: Bell }
  ];
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "TOFU Awareness Blast",
      status: "active",
      channels: ["Email", "Push"],
      funnel: "TOFU",
      engagement: 45,
      conversions: 8
    },
    {
      id: "2",
      name: "MOFU Product Tour",
      status: "active",
      channels: ["SMS", "Email", "WhatsApp"],
      funnel: "MOFU",
      engagement: 62,
      conversions: 22
    },
    {
      id: "3",
      name: "BOFU Demo Request",
      status: "active",
      channels: ["Messenger", "Push"],
      funnel: "BOFU",
      engagement: 78,
      conversions: 35
    },
    {
      id: "4",
      name: "Behavioral Retargeting",
      status: "draft",
      channels: ["Email", "SMS"],
      funnel: "MOFU",
      engagement: 0,
      conversions: 0
    }
  ]);

  const metrics: MetricCard[] = [
    {
      label: "Total Users",
      value: "24,582",
      change: 12,
      icon: Users,
      color: "bg-blue-500"
    },
    {
      label: "Active Campaigns",
      value: campaigns.filter(c => c.status === "active").length.toString(),
      change: 3,
      icon: Target,
      color: "bg-purple-500"
    },
    {
      label: "Avg. Engagement",
      value: "42%",
      change: -2,
      icon: TrendingUp,
      color: "bg-green-500"
    },
    {
      label: "Conversion Rate",
      value: "12.4%",
      change: 8,
      icon: Zap,
      color: "bg-orange-500"
    }
  ];

  const funnelStages: UserSegment[] = [
    { stage: "Top of Funnel (TOFU)", count: 12450, percentage: 50, trend: 15 },
    { stage: "Middle of Funnel (MOFU)", count: 7834, percentage: 32, trend: 8 },
    { stage: "Bottom of Funnel (BOFU)", count: 4298, percentage: 18, trend: 22 }
  ];

  const mockUsers: UserWithMessage[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      funnelStage: "TOFU",
      lastActive: "2 hours ago",
      engagement: 45,
      aiMessage: {
        subject: "Sarah, here's what you need to know about Marketing Automation",
        body: "Hi Sarah,\n\nWe noticed you're interested in Marketing Automation. Here's a quick guide to get started:\n\n✓ Industry insights on Marketing Automation\n✓ Best practices from top performers\n✓ Exclusive resources just for you\n\nCurious to learn more?",
        cta: "Learn More",
        channel: "Email"
      }
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "mchen@example.com",
      funnelStage: "TOFU",
      lastActive: "5 hours ago",
      engagement: 38,
      aiMessage: {
        subject: "Michael, discover smart solutions",
        body: "👋 Hey Michael! 🎯\n\nSaw you checking out SaaS Solutions. We've got some fresh insights that might help! Quick question - are you exploring this for your team or personal development? 🤔",
        cta: "Reply Now",
        channel: "WhatsApp"
      }
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily.r@example.com",
      funnelStage: "MOFU",
      lastActive: "1 hour ago",
      engagement: 72,
      aiMessage: {
        subject: "Emily, see how Marketing Automation can benefit you",
        body: "Hi Emily,\n\nBased on your high engagement, here's what could help:\n\n✓ How Marketing Automation drives results\n✓ Real ROI metrics from similar businesses\n✓ No-strings-attached consultation\n\nReady to see the impact?",
        cta: "Schedule Demo",
        channel: "Email"
      }
    },
    {
      id: "4",
      name: "David Kim",
      email: "david.k@example.com",
      funnelStage: "MOFU",
      lastActive: "3 hours ago",
      engagement: 65,
      aiMessage: {
        subject: "David, ready to boost results?",
        body: "Hi David! 👋\n\nLooks like you're serious about SaaS! 🚀 We help teams like yours go from exploring to executing in just 30 days.\n\nWanna see how? 😊",
        cta: "Yes, show me",
        channel: "WhatsApp"
      }
    },
    {
      id: "5",
      name: "Jessica Williams",
      email: "jessica.w@example.com",
      funnelStage: "BOFU",
      lastActive: "30 mins ago",
      engagement: 89,
      aiMessage: {
        subject: "Jessica, complete your demo",
        body: "Hi Jessica,\n\nYou're close to unlocking success. Here's your final step:\n\n✓ Book your personalized demo (15 mins)\n✓ Get 30-day free trial\n✓ Direct support from our team\n\nDon't miss this.",
        cta: "Get Started Now",
        channel: "Email"
      }
    },
    {
      id: "6",
      name: "Alex Thompson",
      email: "alex.t@example.com",
      funnelStage: "BOFU",
      lastActive: "1 hour ago",
      engagement: 91,
      aiMessage: {
        subject: "Alex, your exclusive offer awaits",
        body: "Alex! 🎉\n\nYou're this close to unlocking amazing results!\n\nFinal step: Let's chat about what matters most to you. Free, no pressure. ✨",
        cta: "Book demo",
        channel: "Messenger"
      }
    },
    {
      id: "7",
      name: "Lisa Anderson",
      email: "lisa.a@example.com",
      funnelStage: "TOFU",
      lastActive: "3 hours ago",
      engagement: 42,
      aiMessage: {
        subject: "Lisa, discover the power of Marketing Automation",
        body: "Hi Lisa,\n\nWe noticed you're interested in Marketing Automation. Here's a quick guide to get started:\n\n✓ Industry insights on Marketing Automation\n✓ Best practices from top performers\n✓ Exclusive resources just for you\n\nCurious to learn more?",
        cta: "Learn More",
        channel: "Email"
      }
    },
    {
      id: "8",
      name: "Robert Martinez",
      email: "robert.m@example.com",
      funnelStage: "TOFU",
      lastActive: "6 hours ago",
      engagement: 35,
      aiMessage: {
        subject: "Robert, here's what you need to know about SaaS",
        body: "👋 Hey Robert! 🎯\n\nSaw you checking out SaaS. We've got some fresh insights that might help! Quick question - are you exploring this for your team or personal development? 🤔",
        cta: "Reply Now",
        channel: "WhatsApp"
      }
    },
    {
      id: "9",
      name: "Jennifer Lee",
      email: "jennifer.l@example.com",
      funnelStage: "MOFU",
      lastActive: "45 mins ago",
      engagement: 68,
      aiMessage: {
        subject: "Jennifer, see how our solution can benefit you",
        body: "Hi Jennifer,\n\nBased on your recent activity, here's what could help:\n\n✓ How our solution drives results\n✓ Real ROI metrics from similar businesses\n✓ No-strings-attached consultation\n\nReady to see the impact?",
        cta: "Schedule Demo",
        channel: "Email"
      }
    },
    {
      id: "10",
      name: "James Wilson",
      email: "james.w@example.com",
      funnelStage: "BOFU",
      lastActive: "15 mins ago",
      engagement: 94,
      aiMessage: {
        subject: "James, claim your exclusive offer now",
        body: "Hi James,\n\nYou're this close to unlocking amazing results!\n\nFinal step: Let's chat about what matters most to you. Free, no pressure. ✨",
        cta: "Get Started Now",
        channel: "Email"
      }
    }
  ];

  const handleFunnelView = (stage: string) => {
    const stageCode = stage.split('(')[1]?.replace(')', '') || stage;
    navigate(`/funnel-users/${stageCode}`);
  };

  const channelMetrics = [
    { name: "Email", icon: Mail, users: 18432, engagement: 38, color: "bg-blue-500" },
    { name: "SMS", icon: Smartphone, users: 14256, engagement: 52, color: "bg-green-500" },
    { name: "Push", icon: Send, users: 16789, engagement: 48, color: "bg-purple-500" },
    { name: "WhatsApp", icon: MessageCircle, users: 8934, engagement: 65, color: "bg-emerald-500" },
  ];

  const handleNewCampaign = () => {
    const newCampaign: Campaign = {
      id: Math.random().toString(),
      name: "New Campaign",
      status: "draft",
      channels: ["Email"],
      funnel: "TOFU",
      engagement: 0,
      conversions: 0
    };
    setCampaigns([...campaigns, newCampaign]);
    setNewCampaignOpen(false);
    console.log("Campaign Created: New campaign has been created. Start editing to add details.");
  };

  const handleEditCampaign = (id: string) => {
    console.log(`Edit Mode: Opening campaign ${id} for editing...`);
  };

  const handleDuplicateCampaign = (id: string) => {
    const campaign = campaigns.find(c => c.id === id);
    if (campaign) {
      const newCampaign = {
        ...campaign,
        id: Math.random().toString(),
        name: `${campaign.name} (Copy)`
      };
      setCampaigns([...campaigns, newCampaign]);
      console.log(`Campaign Duplicated: "${campaign.name}" has been duplicated successfully.`);
    }
  };

  const handleDeleteCampaign = (id: string) => {
    const campaign = campaigns.find(c => c.id === id);
    setCampaigns(campaigns.filter(c => c.id !== id));
    console.log(`Campaign Deleted: "${campaign?.name}" has been deleted.`);
  };

  const handleToggleCampaignStatus = (id: string) => {
    const campaign = campaigns.find(c => c.id === id);
    if (campaign) {
      const newStatus = campaign.status === 'active' ? 'paused' : campaign.status === 'paused' ? 'draft' : 'active';
      setCampaigns(campaigns.map(c =>
        c.id === id ? { ...c, status: newStatus } : c
      ));
      console.log(`Campaign ${newStatus === 'active' ? 'Activated' : newStatus === 'paused' ? 'Paused' : 'Drafted'}: "${campaign.name}" is now ${newStatus}.`);
    }
  };

  const filteredCampaigns = filterStatus === 'all' 
    ? campaigns 
    : campaigns.filter(c => c.status === filterStatus);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">CMGalaxy</h1>
                  <p className="text-xs text-primary font-semibold">AI Personalization & Drip Campaigns</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/message-generator"
                className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                AI Messages
              </Link>
              <button
                onClick={() => setSettingsOpen(true)}
                className="p-2.5 hover:bg-muted rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5 text-muted-foreground" />
              </button>
              <button
                onClick={() => setNewCampaignOpen(true)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Campaign
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Modals */}
      <CampaignBuilderModal
        isOpen={newCampaignOpen}
        onClose={() => setNewCampaignOpen(false)}
        onCreate={handleNewCampaign}
      />

      <Modal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        title="Settings"
        description="Manage your account and platform preferences."
        actions={
          <button
            onClick={() => setSettingsOpen(false)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Done
          </button>
        }
      >
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-3">Notification Preferences</h4>
            <div className="space-y-2">
              {["Campaign milestones", "Performance alerts", "System updates"].map(pref => (
                <label key={pref} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm text-foreground">{pref}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="border-t border-border pt-4">
            <h4 className="font-semibold text-foreground mb-3">API Settings</h4>
            <button className="w-full px-3 py-2 border border-border rounded-lg text-foreground text-sm hover:bg-muted transition-colors">
              View API Keys
            </button>
          </div>
        </div>
      </Modal>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Key Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, idx) => (
            <MetricCard key={idx} {...metric} />
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 flex gap-2 bg-card rounded-lg border border-border p-2 w-fit">
          <TabButton 
            active={activeTab === "overview"} 
            onClick={() => setActiveTab("overview")} 
            icon={Eye}
            label="Overview"
          />
          <TabButton 
            active={activeTab === "campaigns"} 
            onClick={() => setActiveTab("campaigns")} 
            icon={Target}
            label="Campaigns"
          />
          <TabButton 
            active={activeTab === "audience"} 
            onClick={() => setActiveTab("audience")} 
            icon={Layers}
            label="Audience"
          />
          <TabButton 
            active={activeTab === "drips"} 
            onClick={() => setActiveTab("drips")} 
            icon={Workflow}
            label="Drip Campaigns"
          />
          <TabButton 
            active={activeTab === "channels"} 
            onClick={() => setActiveTab("channels")} 
            icon={MessageCircle}
            label="Channels"
          />
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Active Campaigns Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground">Active Campaigns</h2>
                <button 
                  onClick={() => setActiveTab("campaigns")}
                  className="text-primary text-sm font-semibold hover:underline flex items-center gap-1 transition-colors"
                >
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {campaigns.filter(c => c.status === "active").slice(0, 3).map((campaign) => (
                  <CampaignCard 
                    key={campaign.id} 
                    campaign={campaign}
                    onEdit={handleEditCampaign}
                    onDuplicate={handleDuplicateCampaign}
                    onDelete={handleDeleteCampaign}
                    onToggleStatus={handleToggleCampaignStatus}
                  />
                ))}
              </div>
            </div>

            {/* WebEngage-style Revenue Analytics */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Revenue Impact & ROI
                </h3>
                <span className="text-xs text-muted-foreground">Last 30 days</span>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Revenue Generated", value: "$48,250", change: "+25%", color: "text-green-500" },
                  { label: "Campaign ROI", value: "4.8x", change: "+12%", color: "text-green-500" },
                  { label: "Avg. Order Value", value: "$85", change: "+8%", color: "text-green-500" },
                  { label: "Customer LTV", value: "$420", change: "+15%", color: "text-green-500" },
                ].map((metric, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-muted/50 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
                    <p className="text-xl font-bold text-foreground">{metric.value}</p>
                    <p className={`text-xs font-medium ${metric.color}`}>{metric.change}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Revenue Attribution by Channel</span>
                </div>
                <div className="space-y-2">
                  {[
                    { channel: "Email", revenue: "$18,420", percent: 38, color: "bg-blue-500" },
                    { channel: "WhatsApp", revenue: "$14,475", percent: 30, color: "bg-emerald-500" },
                    { channel: "SMS", revenue: "$9,650", percent: 20, color: "bg-green-500" },
                    { channel: "Push", revenue: "$5,705", percent: 12, color: "bg-purple-500" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-16">{item.channel}</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-foreground w-20 text-right">{item.revenue}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* A/B Testing Preview */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Split className="w-5 h-5 text-primary" />
                  A/B Testing Experiments
                </h3>
                <button className="text-primary text-sm font-semibold hover:underline">
                  View All
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: "Email Subject Line Test", variantA: "Get 50% Off Today!", variantB: "Exclusive Deal Inside", winner: "B", uplift: "+18% CTR", status: "active" },
                  { name: "WhatsApp CTA Test", variantA: "Shop Now", variantB: "Claim Offer", winner: "A", uplift: "+12% Conv", status: "completed" },
                ].map((test, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-border bg-muted/30">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-sm text-foreground">{test.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${test.status === 'active' ? 'bg-green-500/20 text-green-600' : 'bg-blue-500/20 text-blue-600'}`}>
                        {test.status === 'active' ? 'Running' : 'Completed'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className={`p-2 rounded-lg border ${test.winner === 'A' ? 'border-green-500 bg-green-50' : 'border-border'}`}>
                        <p className="text-xs text-muted-foreground">Variant A</p>
                        <p className="text-xs font-medium text-foreground truncate">{test.variantA}</p>
                      </div>
                      <div className={`p-2 rounded-lg border ${test.winner === 'B' ? 'border-green-500 bg-green-50' : 'border-border'}`}>
                        <p className="text-xs text-muted-foreground">Variant B</p>
                        <p className="text-xs font-medium text-foreground truncate">{test.variantB}</p>
                      </div>
                    </div>
                    {test.status === 'completed' && (
                      <div className="flex items-center gap-2 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-green-600 font-semibold">Winner: Variant {test.winner} ({test.uplift})</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* RFM Segmentation */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <PieChartIcon className="w-5 h-5 text-primary" />
                RFM Segmentation
              </h3>
              <p className="text-sm text-muted-foreground mb-4">Recency • Frequency • Monetary value analysis</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { segment: "Champions", count: 1240, revenue: "$24,500", color: "bg-green-500" },
                  { segment: "Loyal Customers", count: 2890, revenue: "$18,200", color: "bg-blue-500" },
                  { segment: "At Risk", count: 1560, revenue: "$8,400", color: "bg-orange-500" },
                  { segment: "Lost", count: 890, revenue: "$2,100", color: "bg-red-500" },
                ].map((segment, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer">
                    <div className={`w-3 h-3 rounded-full ${segment.color} mb-2`} />
                    <p className="font-semibold text-foreground text-sm">{segment.segment}</p>
                    <p className="text-xs text-muted-foreground">{segment.count.toLocaleString()} users</p>
                    <p className="text-sm font-bold text-foreground mt-1">{segment.revenue}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                {[
                  { action: "Campaign 'BOFU Demo Request' reached 50K impressions", time: "2 hours ago", icon: CheckCircle2 },
                  { action: "WhatsApp channel engagement spiked to 65%", time: "4 hours ago", icon: TrendingUp },
                  { action: "New drift campaign deployed for MOFU segment", time: "6 hours ago", icon: Zap },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <item.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{item.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Campaigns Tab */}
        {activeTab === "campaigns" && (
          <div className="space-y-6">
            {/* AI Generated Campaigns Section */}
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/5 rounded-xl border border-primary/20 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      AI Campaign Generator
                      <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full font-medium">Beta</span>
                    </h3>
                    <p className="text-sm text-muted-foreground">Generate personalized campaigns with AI based on your goals</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors">
                  <Wand2 className="w-4 h-4" />
                  Generate New
                </button>
              </div>
              
              {/* AI Suggestions Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "Flash Sale - Summer Collection",
                    type: "Promotional",
                    channels: ["Email", "SMS", "Push"],
                    audience: "High Engagement Users",
                    expectedCtr: "24%",
                    description: "Urgency-driven campaign with countdown timer and limited stock messaging"
                  },
                  {
                    title: "Win-Back Inactive Users",
                    type: "Re-engagement",
                    channels: ["Email", "WhatsApp"],
                    audience: "At-Risk Segment",
                    expectedCtr: "18%",
                    description: "Personalized 'We miss you' message with special comeback offer"
                  },
                  {
                    title: "Product Education Series",
                    type: "Nurture",
                    channels: ["Email"],
                    audience: "New Signups",
                    expectedCtr: "32%",
                    description: "3-part email series showcasing key features and benefits"
                  },
                  {
                    title: "Abandoned Cart Recovery",
                    type: "Conversion",
                    channels: ["Email", "SMS"],
                    audience: "Cart Abandoners",
                    expectedCtr: "28%",
                    description: "Automated sequence with urgency and social proof elements"
                  },
                  {
                    title: "VIP Early Access",
                    type: "Loyalty",
                    channels: ["Email", "Push"],
                    audience: "Champions Segment",
                    expectedCtr: "45%",
                    description: "Exclusive early access with personalized discount codes"
                  },
                  {
                    title: "Referral Boost Campaign",
                    type: "Growth",
                    channels: ["Email", "WhatsApp"],
                    audience: "Loyal Customers",
                    expectedCtr: "22%",
                    description: "Incentivized referral program with double-sided rewards"
                  }
                ].map((campaign, idx) => (
                  <div key={idx} className="bg-card/80 backdrop-blur-sm rounded-lg border border-border p-4 hover:border-primary/40 transition-all cursor-pointer group">
                    <div className="flex items-start justify-between mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        campaign.type === "Promotional" ? "bg-orange-500/20 text-orange-600" :
                        campaign.type === "Re-engagement" ? "bg-blue-500/20 text-blue-600" :
                        campaign.type === "Nurture" ? "bg-green-500/20 text-green-600" :
                        campaign.type === "Conversion" ? "bg-purple-500/20 text-purple-600" :
                        campaign.type === "Loyalty" ? "bg-pink-500/20 text-pink-600" :
                        "bg-cyan-500/20 text-cyan-600"
                      }`}>
                        {campaign.type}
                      </span>
                      <div className="flex gap-1">
                        {campaign.channels.map((ch, i) => (
                          <span key={i} className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs">
                            {ch === "Email" && <Mail className="w-3 h-3" />}
                            {ch === "SMS" && <Smartphone className="w-3 h-3" />}
                            {ch === "WhatsApp" && <MessageCircle className="w-3 h-3" />}
                            {ch === "Push" && <Bell className="w-3 h-3" />}
                          </span>
                        ))}
                      </div>
                    </div>
                    <h4 className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">{campaign.title}</h4>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{campaign.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Target: <span className="text-foreground font-medium">{campaign.audience}</span></span>
                      <span className="text-green-600 font-semibold">CTR: {campaign.expectedCtr}</span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border flex gap-2">
                      <button 
                        onClick={() => {
                          setSelectedAiCampaign(campaign);
                          setAiPreviewOpen(true);
                        }}
                        className="px-3 py-1.5 border border-border rounded text-xs font-medium hover:bg-muted transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        Preview
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedAiCampaign(campaign);
                          setAiUseThisOpen(true);
                        }}
                        className="flex-1 px-3 py-1.5 bg-primary text-primary-foreground rounded text-xs font-medium hover:bg-primary/90 transition-colors"
                      >
                        Use This
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedAiCampaign(campaign);
                          setAiCustomizeOpen(true);
                        }}
                        className="px-3 py-1.5 border border-border rounded text-xs font-medium hover:bg-muted transition-colors"
                      >
                        Customize
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* AI Input Prompt */}
              <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Describe your campaign goal (e.g., 'I want to re-engage users who haven't purchased in 30 days')..."
                    className="flex-1 px-4 py-2.5 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors whitespace-nowrap">
                    <Sparkles className="w-4 h-4" />
                    Generate
                  </button>
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Powered by GPT-4</span>
                  <span className="flex items-center gap-1"><Target className="w-3 h-3" /> Audience-optimized</span>
                  <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Performance predicted</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground">All Campaigns</h2>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-card border border-border rounded-lg text-sm text-foreground cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="paused">Paused</option>
              </select>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCampaigns.map((campaign) => (
                <CampaignCard 
                  key={campaign.id} 
                  campaign={campaign}
                  onEdit={handleEditCampaign}
                  onDuplicate={handleDuplicateCampaign}
                  onDelete={handleDeleteCampaign}
                  onToggleStatus={handleToggleCampaignStatus}
                />
              ))}
            </div>
            {filteredCampaigns.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">No campaigns found with the selected filter.</p>
              </div>
            )}
          </div>
        )}

        {/* AI Campaign Preview Modal */}
        {aiPreviewOpen && selectedAiCampaign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/60" onClick={() => setAiPreviewOpen(false)} />
            <div className="relative z-50 bg-card border border-border rounded-xl shadow-2xl max-w-lg w-full mx-4 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{selectedAiCampaign.title}</h3>
                    <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full font-medium">{selectedAiCampaign.type}</span>
                  </div>
                </div>
                <button onClick={() => setAiPreviewOpen(false)} className="p-2 hover:bg-muted rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{selectedAiCampaign.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Target Audience</p>
                    <p className="text-sm font-medium text-foreground">{selectedAiCampaign.audience}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Expected CTR</p>
                    <p className="text-sm font-medium text-green-600">{selectedAiCampaign.expectedCtr}</p>
                  </div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2">Channels</p>
                  <div className="flex gap-2">
                    {selectedAiCampaign.channels.map((ch: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-card border border-border rounded text-xs font-medium">{ch}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setAiPreviewOpen(false)} className="flex-1 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors">Close</button>
                <button onClick={() => { setAiPreviewOpen(false); setAiUseThisOpen(true); }} className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Use This</button>
              </div>
            </div>
          </div>
        )}

        {/* AI Campaign Use This Modal */}
        {aiUseThisOpen && selectedAiCampaign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/60" onClick={() => setAiUseThisOpen(false)} />
            <div className="relative z-50 bg-card border border-border rounded-xl shadow-2xl max-w-md w-full mx-4 p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Activate Campaign?</h3>
                <p className="text-sm text-muted-foreground">Ready to launch "{selectedAiCampaign.title}"? This will start sending messages to your audience.</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 mb-6 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Type:</span><span className="font-medium text-foreground">{selectedAiCampaign.type}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Channels:</span><span className="font-medium text-foreground">{selectedAiCampaign.channels.join(", ")}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Expected CTR:</span><span className="font-medium text-green-600">{selectedAiCampaign.expectedCtr}</span></div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setAiUseThisOpen(false)} className="flex-1 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
                <button onClick={() => { console.log(`Campaign Activated: ${selectedAiCampaign.title}`); setAiUseThisOpen(false); }} className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" /> Activate Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* AI Campaign Customize Modal */}
        {aiCustomizeOpen && selectedAiCampaign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/60" onClick={() => setAiCustomizeOpen(false)} />
            <div className="relative z-50 bg-card border border-border rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Edit3 className="w-5 h-5 text-primary" />
                    Customize Campaign
                  </h3>
                  <p className="text-xs text-muted-foreground">Edit "{selectedAiCampaign.title}" before launching</p>
                </div>
                <button onClick={() => setAiCustomizeOpen(false)} className="p-2 hover:bg-muted rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1 space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Campaign Title</label>
                  <input type="text" defaultValue={selectedAiCampaign.title} className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Message Content</label>
                  <textarea defaultValue={`Hi {FirstName}, ${selectedAiCampaign.description}`} rows={4} className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Target Audience</label>
                    <input type="text" defaultValue={selectedAiCampaign.audience} className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Channels</label>
                    <select multiple className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm">
                      {selectedAiCampaign.channels.map((ch: string) => <option key={ch} selected>{ch}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-border bg-muted/30 flex justify-end gap-3">
                <button onClick={() => setAiCustomizeOpen(false)} className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
                <button onClick={() => { console.log(`Campaign Customized: ${selectedAiCampaign.title}`); setAiCustomizeOpen(false); }} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Save & Launch</button>
              </div>
            </div>
          </div>
        )}

        {/* Audience Tab */}
        {activeTab === "audience" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">User Segments by Funnel Stage</h2>
              <div className="grid sm:grid-cols-3 gap-5 mb-8">
                {funnelStages.map((stage, idx) => (
                  <FunnelStageCard key={idx} {...stage} onView={() => handleFunnelView(stage.stage)} />
                ))}
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Behavior-Based Segmentation
              </h3>
              <div className="space-y-4">
                {[
                  { name: "High Engagement Users", count: 3456, behavior: "Visited 3+ pages, 5+ min session" },
                  { name: "Cart Abandoners", count: 2134, behavior: "Added to cart, no purchase" },
                  { name: "Demo Bookers", count: 892, behavior: "Opened demo links, high CTR" },
                  { name: "At-Risk Users", count: 1567, behavior: "Inactive for 30+ days" },
                ].map((segment, idx) => (
                  <div key={idx} className="p-4 border border-border rounded-lg hover:bg-muted/40 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{segment.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">{segment.behavior}</p>
                      </div>
                      <span className="text-lg font-bold text-primary">{segment.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Drip Campaigns Tab */}
        {activeTab === "drips" && <DripCampaignsTab />}

        {/* Channels Tab */}
        {activeTab === "channels" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Multi-Channel Performance</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {channelMetrics.map((channel, idx) => (
                <div key={idx} className="bg-card rounded-lg border border-border p-6 hover:border-primary/40 transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${channel.color}`}>
                      <channel.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-1 text-green-500 text-xs font-semibold">
                      <ArrowUpRight className="w-4 h-4" />
                      +12%
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-4">{channel.name}</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Active Users</p>
                      <p className="text-2xl font-bold text-foreground">{(channel.users / 1000).toFixed(1)}K</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Engagement Rate</p>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`${channel.color} rounded-full h-2 transition-all`}
                          style={{ width: `${channel.engagement}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{channel.engagement}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
