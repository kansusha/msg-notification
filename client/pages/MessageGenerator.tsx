import { useState } from "react";
import { 
  ArrowLeft, Sparkles, Mail, MessageCircle, Smartphone, Send, 
  MessageSquare, Zap, Copy, CheckCircle, ChevronDown
} from "lucide-react";
import { Link } from "react-router-dom";

interface GeneratedMessages {
  email?: { subject: string; body: string; cta: string };
  sms?: { message: string; cta: string };
  whatsapp?: { message: string; quickReplies: string[] };
  messenger?: { message: string; buttons: string[] };
  push?: { title: string; message: string; cta: string };
}

interface ChannelRecommendation {
  channel: string;
  score: number;
  reasoning: string;
  icon: React.ElementType;
}

const generateMessages = (formData: any): { messages: GeneratedMessages; recommendations: ChannelRecommendation[] } => {
  const { userName, interests, funnelStage, campaignSource, behavior, goal } = formData;
  
  // Tone adjustments based on funnel stage
  const getTone = (stage: string) => {
    if (stage === "TOFU") return "educational and curious";
    if (stage === "MOFU") return "value-driven and benefit-focused";
    return "conversion-focused and urgent";
  };

  const tone = getTone(funnelStage);

  // Channel-specific message generation
  const messages: GeneratedMessages = {};

  // Email Generation
  messages.email = {
    subject: funnelStage === "TOFU" 
      ? `${userName}, here's what you need to know about ${interests[0] || 'our solution'}`
      : funnelStage === "MOFU"
      ? `${userName}, see how ${interests[0] || 'this'} can benefit you`
      : `${userName}, ${goal === 'conversion' ? 'complete your demo' : 'grab your exclusive offer'}`,
    body: funnelStage === "TOFU"
      ? `Hi ${userName},\n\nWe noticed you're interested in ${interests[0] || 'our product'}. Here's a quick guide to get started:\n\n✓ Industry insights on ${interests[0]}\n✓ Best practices from top performers\n✓ Exclusive resources just for you\n\nCurious to learn more?`
      : funnelStage === "MOFU"
      ? `Hi ${userName},\n\nBased on your ${behavior[0] || 'recent activity'}, here's what could help:\n\n✓ How ${interests[0] || 'this solution'} drives results\n✓ Real ROI metrics from similar businesses\n✓ No-strings-attached consultation\n\nReady to see the impact?`
      : `Hi ${userName},\n\nYou're close to unlocking success. Here's your final step:\n\n✓ ${goal === 'conversion' ? 'Book your personalized demo (15 mins)' : 'Claim your exclusive offer'}\n✓ Get 30-day free trial\n✓ Direct support from our team\n\nDon't miss this.`,
    cta: funnelStage === "TOFU" ? "Learn More" : funnelStage === "MOFU" ? "Schedule Demo" : "Get Started Now"
  };

  // SMS Generation
  messages.sms = {
    message: funnelStage === "TOFU"
      ? `${userName}, discover ${interests[0] || 'smart solutions'}. ${campaignSource === 'organic' ? 'See what experts recommend' : 'Limited time offer'}. `
      : funnelStage === "MOFU"
      ? `${userName}, ${behavior[0] === 'high_engagement' ? 'ready to boost results?' : 'still interested in learning?'} ${interests[0]} can help. `
      : `${userName}, your ${goal} is 1 click away. Claim now → `,
    cta: funnelStage === "TOFU" ? "Learn" : funnelStage === "MOFU" ? "Demo" : "Start"
  };

  // WhatsApp Generation (Conversational)
  messages.whatsapp = {
    message: funnelStage === "TOFU"
      ? `👋 Hey ${userName}! 🎯\n\nSaw you checking out ${interests[0]}. We've got some fresh insights that might help! Quick question - are you exploring this for your team or personal development? 🤔`
      : funnelStage === "MOFU"
      ? `Hi ${userName}! 👋\n\nLooks like you're serious about ${interests[0]}! 🚀 We help teams like yours go from exploring to executing in just 30 days.\n\nWanna see how? 😊`
      : `${userName}! 🎉\n\nYou're this close to unlocking ${goal === 'conversion' ? 'your personalized strategy' : 'amazing results'}!\n\nFinal step: Let's chat about what matters most to you. Free, no pressure. ✨`,
    quickReplies: funnelStage === "TOFU" 
      ? ["Team", "Personal", "Both", "Tell me more"]
      : funnelStage === "MOFU"
      ? ["Yes, show me", "Not now", "Ask a question"]
      : ["Book demo", "Ask questions", "Send info"]
  };

  // Messenger Generation (Structured + Conversational)
  messages.messenger = {
    message: funnelStage === "TOFU"
      ? `🎯 Hi ${userName}! We noticed you're interested in ${interests[0]}. Here's a personalized guide we think you'll love. Would you like to explore it?`
      : funnelStage === "MOFU"
      ? `Hey ${userName}! 👋 Based on your interest in ${interests[0]}, we've prepared a special ${goal === 'engagement' ? 'demo' : 'offer'}. Interested?`
      : `${userName}! 🚀 You're about to transform how you approach ${interests[0]}. Ready to take the next step?`,
    buttons: funnelStage === "TOFU"
      ? ["Yes, let's go", "Maybe later", "Learn more"]
      : funnelStage === "MOFU"
      ? ["Book demo", "Send details", "Call me"]
      : ["Complete onboarding", "Schedule call", "View offer"]
  };

  // Push Notification Generation
  messages.push = {
    title: funnelStage === "TOFU"
      ? `${interests[0]} 101: What You Need to Know`
      : funnelStage === "MOFU"
      ? `${userName}, see your ${interests[0]} potential`
      : `${userName}, your ${goal === 'conversion' ? 'demo is ready' : 'exclusive offer'} awaits`,
    message: funnelStage === "TOFU"
      ? `Quick guide on ${interests[0]} for beginners. Expert tips inside.`
      : funnelStage === "MOFU"
      ? `Discover how ${interests[0]} drives results. 4-min read.`
      : `Complete your setup and unlock premium features. Tap now.`,
    cta: "Open"
  };

  // Channel Recommendations
  const recommendations: ChannelRecommendation[] = [
    {
      channel: "SMS / WhatsApp",
      score: goal === "conversion" || goal === "engagement" ? 95 : 75,
      reasoning: goal === "conversion" ? "High urgency drives immediate action" : "Quick engagement from mobile-first audience",
      icon: Smartphone
    },
    {
      channel: "Email",
      score: funnelStage === "TOFU" || funnelStage === "MOFU" ? 90 : 70,
      reasoning: funnelStage === "TOFU" ? "Perfect for educational content delivery" : "Great for detailed value propositions",
      icon: Mail
    },
    {
      channel: "Messenger",
      score: behavior.includes("high_engagement") || behavior.includes("repeat_visit") ? 85 : 60,
      reasoning: "Highly personalized, conversational approach works best with engaged users",
      icon: MessageCircle
    },
    {
      channel: "Push Notification",
      score: goal === "engagement" ? 80 : 65,
      reasoning: "Excellent for timely re-engagement and retention campaigns",
      icon: Send
    }
  ];

  return { messages, recommendations: recommendations.sort((a, b) => b.score - a.score) };
};

export default function MessageGenerator() {
  const [formData, setFormData] = useState({
    userName: "Sarah",
    location: "San Francisco",
    device: "mobile",
    interests: ["SaaS", "Marketing Automation"],
    funnelStage: "MOFU",
    campaignSource: "Google Ads",
    behavior: ["high_engagement", "repeat_visit"],
    crmStatus: "qualified_lead",
    pastInteractions: "email_open, page_visit",
    channels: ["email", "sms", "whatsapp", "messenger", "push"],
    goal: "conversion",
  });

  const [generatedData, setGeneratedData] = useState<any>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleGenerate = () => {
    const result = generateMessages(formData);
    setGeneratedData(result);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const MessageCard = ({ channel, icon: Icon, data, recommendation }: any) => (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">{channel}</h3>
            {recommendation && (
              <p className="text-xs text-muted-foreground">
                Score: <span className="text-green-500 font-semibold">{recommendation.score}%</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {data && (
        <div className="space-y-3">
          {data.subject && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Subject Line</p>
              <div className="bg-muted p-3 rounded-lg text-sm text-foreground">
                {data.subject}
              </div>
              <button
                onClick={() => copyToClipboard(data.subject, `${channel}-subject`)}
                className="mt-2 flex items-center gap-2 text-xs text-primary hover:underline"
              >
                <Copy className="w-3 h-3" />
                {copied === `${channel}-subject` ? "Copied!" : "Copy"}
              </button>
            </div>
          )}

          {data.title && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Title</p>
              <div className="bg-muted p-3 rounded-lg text-sm text-foreground">
                {data.title}
              </div>
            </div>
          )}

          {data.body && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Body</p>
              <div className="bg-muted p-3 rounded-lg text-sm text-foreground whitespace-pre-line">
                {data.body}
              </div>
              <button
                onClick={() => copyToClipboard(data.body, `${channel}-body`)}
                className="mt-2 flex items-center gap-2 text-xs text-primary hover:underline"
              >
                <Copy className="w-3 h-3" />
                {copied === `${channel}-body` ? "Copied!" : "Copy"}
              </button>
            </div>
          )}

          {data.message && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Message</p>
              <div className="bg-muted p-3 rounded-lg text-sm text-foreground">
                {data.message}
              </div>
              <button
                onClick={() => copyToClipboard(data.message, `${channel}-message`)}
                className="mt-2 flex items-center gap-2 text-xs text-primary hover:underline"
              >
                <Copy className="w-3 h-3" />
                {copied === `${channel}-message` ? "Copied!" : "Copy"}
              </button>
            </div>
          )}

          {data.quickReplies && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Quick Replies</p>
              <div className="flex flex-wrap gap-2">
                {data.quickReplies.map((reply: string, idx: number) => (
                  <span key={idx} className="px-3 py-1.5 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                    {reply}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.buttons && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Interactive Buttons</p>
              <div className="flex flex-wrap gap-2">
                {data.buttons.map((btn: string, idx: number) => (
                  <button key={idx} className="px-3 py-1.5 bg-primary text-primary-foreground text-xs rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          )}

          {data.cta && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Call-to-Action</p>
              <div className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-lg text-sm font-semibold text-primary">
                {data.cta}
              </div>
            </div>
          )}
        </div>
      )}

      {recommendation && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Why recommended:</p>
          <p className="text-sm text-foreground">{recommendation.reasoning}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-muted rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                <Sparkles className="w-8 h-8 text-primary" />
                Message Generator
              </h1>
              <p className="text-sm text-muted-foreground mt-1">AI-powered personalized messages across all channels</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-foreground mb-6">Personalization Data</h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">User Name</label>
                  <input
                    type="text"
                    value={formData.userName}
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Funnel Stage</label>
                  <select
                    value={formData.funnelStage}
                    onChange={(e) => setFormData({ ...formData, funnelStage: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm"
                  >
                    <option value="TOFU">Top of Funnel (TOFU)</option>
                    <option value="MOFU">Middle of Funnel (MOFU)</option>
                    <option value="BOFU">Bottom of Funnel (BOFU)</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Campaign Source</label>
                  <select
                    value={formData.campaignSource}
                    onChange={(e) => setFormData({ ...formData, campaignSource: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm"
                  >
                    <option value="Google Ads">Google Ads</option>
                    <option value="Meta Ads">Meta Ads</option>
                    <option value="organic">Organic</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Goal</label>
                  <select
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm"
                  >
                    <option value="engagement">Engagement</option>
                    <option value="conversion">Conversion</option>
                    <option value="retention">Retention</option>
                    <option value="lead_capture">Lead Capture</option>
                  </select>
                </div>

                <button
                  onClick={handleGenerate}
                  className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mt-6"
                >
                  <Sparkles className="w-5 h-5" />
                  Generate Messages
                </button>
              </div>
            </div>
          </div>

          {/* Generated Messages Section */}
          <div className="lg:col-span-2">
            {generatedData ? (
              <div className="space-y-6">
                {/* Channel Recommendations */}
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Recommended Channels
                  </h3>
                  <div className="space-y-3">
                    {generatedData.recommendations.map((rec: ChannelRecommendation, idx: number) => (
                      <div key={idx} className="flex items-start justify-between bg-card/50 p-3 rounded-lg border border-border/50">
                        <div className="flex items-center gap-3">
                          <rec.icon className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">{rec.channel}</p>
                            <p className="text-xs text-muted-foreground">{rec.reasoning}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{rec.score}%</p>
                          <p className="text-xs text-muted-foreground">match</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message Cards */}
                <div className="grid gap-6">
                  {generatedData.messages.email && (
                    <MessageCard
                      channel="Email"
                      icon={Mail}
                      data={generatedData.messages.email}
                      recommendation={generatedData.recommendations.find((r: any) => r.channel.includes("Email"))}
                    />
                  )}
                  {generatedData.messages.sms && (
                    <MessageCard
                      channel="SMS"
                      icon={Smartphone}
                      data={generatedData.messages.sms}
                    />
                  )}
                  {generatedData.messages.whatsapp && (
                    <MessageCard
                      channel="WhatsApp"
                      icon={MessageCircle}
                      data={generatedData.messages.whatsapp}
                    />
                  )}
                  {generatedData.messages.messenger && (
                    <MessageCard
                      channel="Messenger"
                      icon={MessageSquare}
                      data={generatedData.messages.messenger}
                    />
                  )}
                  {generatedData.messages.push && (
                    <MessageCard
                      channel="Push Notification"
                      icon={Send}
                      data={generatedData.messages.push}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <Sparkles className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2">Ready to generate?</h3>
                <p className="text-muted-foreground">
                  Fill in the personalization data on the left and click "Generate Messages" to create high-converting content for all channels.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
