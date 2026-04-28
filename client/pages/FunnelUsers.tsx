import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeft, Users, Sparkles, Send as SendIcon, Bell,
  Mail, MessageCircle, Smartphone, Brain, CheckCircle2
} from "lucide-react";

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

const channels = [
  { id: "Email", label: "Email", icon: Mail },
  { id: "SMS", label: "SMS", icon: Smartphone },
  { id: "WhatsApp", label: "WhatsApp", icon: MessageCircle },
  { id: "Push", label: "Push", icon: Bell }
];

// Extended mock data for demonstration (15+ users per stage)
const generateMockUsers = (stage: string): UserWithMessage[] => {
  const baseUsers: Record<string, UserWithMessage[]> = {
    TOFU: [
      { id: "1", name: "Sarah Johnson", email: "sarah.j@example.com", funnelStage: "TOFU", lastActive: "2 hours ago", engagement: 45, aiMessage: { subject: "Sarah, unlock the power of Marketing Automation", body: "Hi Sarah,\n\nWe noticed you're interested in Marketing Automation. Here's a quick guide to get started:\n\n✓ Industry insights on Marketing Automation\n✓ Best practices from top performers\n✓ Exclusive resources just for you\n\nCurious to learn more?", cta: "Learn More", channel: "Email" } },
      { id: "2", name: "Michael Chen", email: "mchen@example.com", funnelStage: "TOFU", lastActive: "5 mins ago", engagement: 38, aiMessage: { subject: "Michael, here's what you need to know about Marketing Automation", body: "👋 Hey Michael! 🎯\n\nSaw you checking out Marketing Automation. We've got some fresh insights that might help! Quick question - are you exploring this for your team or personal development? 🤔", cta: "Reply Now", channel: "WhatsApp" } },
      { id: "7", name: "Lisa Anderson", email: "lisa.a@example.com", funnelStage: "TOFU", lastActive: "3 hours ago", engagement: 42, aiMessage: { subject: "Lisa, discover the power of Marketing Automation", body: "Hi Lisa,\n\nWe noticed you're interested in Marketing Automation. Here's a quick guide to get started:\n\n✓ Industry insights on Marketing Automation\n✓ Best practices from top performers\n✓ Exclusive resources just for you\n\nCurious to learn more?", cta: "Learn More", channel: "Email" } },
      { id: "8", name: "Robert Martinez", email: "robert.m@example.com", funnelStage: "TOFU", lastActive: "6 hours ago", engagement: 35, aiMessage: { subject: "Robert, here's what you need to know about SaaS", body: "👋 Hey Robert! 🎯\n\nSaw you checking out SaaS. We've got some fresh insights that might help! Quick question - are you exploring this for your team or personal development? 🤔", cta: "Reply Now", channel: "WhatsApp" } },
      { id: "t1", name: "Emma Davis", email: "emma.d@example.com", funnelStage: "TOFU", lastActive: "1 hour ago", engagement: 41, aiMessage: { subject: "Emma, start your marketing journey", body: "Hi Emma,\n\nReady to explore marketing automation? We've prepared a special starter kit just for you!", cta: "Get Started", channel: "Email" } },
      { id: "t2", name: "Chris Brown", email: "chris.b@example.com", funnelStage: "TOFU", lastActive: "4 hours ago", engagement: 39, aiMessage: { subject: "Chris, boost your marketing", body: "Hey Chris! 🚀\n\nWant to see how automation can transform your marketing? Let's chat!", cta: "Learn More", channel: "SMS" } },
      { id: "t3", name: "Amanda White", email: "amanda.w@example.com", funnelStage: "TOFU", lastActive: "30 mins ago", engagement: 44, aiMessage: { subject: "Amanda, marketing insights await", body: "Hi Amanda,\n\nYour personalized marketing guide is ready. Check it out!", cta: "View Guide", channel: "Email" } },
      { id: "t4", name: "Daniel Lee", email: "daniel.l@example.com", funnelStage: "TOFU", lastActive: "2 hours ago", engagement: 37, aiMessage: { subject: "Daniel, transform your approach", body: "👋 Daniel!\n\nReady to level up your marketing game? We can help!", cta: "Start Now", channel: "WhatsApp" } },
      { id: "t5", name: "Sophie Turner", email: "sophie.t@example.com", funnelStage: "TOFU", lastActive: "1 hour ago", engagement: 46, aiMessage: { subject: "Sophie, exclusive marketing tips", body: "Hi Sophie,\n\nHere are some exclusive tips to boost your marketing automation!", cta: "Read More", channel: "Email" } },
      { id: "t6", name: "Ryan Garcia", email: "ryan.g@example.com", funnelStage: "TOFU", lastActive: "3 hours ago", engagement: 40, aiMessage: { subject: "Ryan, automation made easy", body: "Hey Ryan! 🎯\n\nLet's simplify your marketing with smart automation.", cta: "Discover How", channel: "SMS" } },
      { id: "t7", name: "Nina Patel", email: "nina.p@example.com", funnelStage: "TOFU", lastActive: "5 hours ago", engagement: 43, aiMessage: { subject: "Nina, your marketing potential", body: "Hi Nina,\n\nUnlock your marketing potential with our AI-powered tools!", cta: "Explore", channel: "Email" } },
      { id: "t8", name: "Tom Wilson", email: "tom.w@example.com", funnelStage: "TOFU", lastActive: "2 hours ago", engagement: 36, aiMessage: { subject: "Tom, marketing secrets revealed", body: "👋 Tom!\n\nDiscover the secrets of successful marketing automation.", cta: "Learn More", channel: "WhatsApp" } },
      { id: "t9", name: "Zoe Miller", email: "zoe.m@example.com", funnelStage: "TOFU", lastActive: "45 mins ago", engagement: 48, aiMessage: { subject: "Zoe, ready to grow?", body: "Hi Zoe,\n\nReady to take your marketing to the next level? Let's do this!", cta: "Get Started", channel: "Email" } },
      { id: "t10", name: "Jack Taylor", email: "jack.t@example.com", funnelStage: "TOFU", lastActive: "1 hour ago", engagement: 34, aiMessage: { subject: "Jack, marketing revolution", body: "Hey Jack! 🚀\n\nJoin the marketing revolution with smart automation.", cta: "Join Now", channel: "SMS" } },
    ],
    MOFU: [
      { id: "3", name: "Emily Rodriguez", email: "emily.r@example.com", funnelStage: "MOFU", lastActive: "1 day ago", engagement: 72, aiMessage: { subject: "Emily, see how our solution can benefit you", body: "Hi Emily,\n\nBased on your recent activity, here's what could help:\n\n✓ How our solution drives results\n✓ Real ROI metrics from similar businesses\n✓ No-strings-attached consultation\n\nReady to see the impact?", cta: "Schedule Demo", channel: "Email" } },
      { id: "4", name: "David Kim", email: "david.k@example.com", funnelStage: "MOFU", lastActive: "3 hours ago", engagement: 68, aiMessage: { subject: "David, ready to boost results?", body: "Hi David! 👋\n\nLooks like you're serious about SaaS! 🚀 We help teams like yours go from exploring to executing in just 30 days.\n\nWanna see how? 😊", cta: "Yes, show me", channel: "WhatsApp" } },
      { id: "9", name: "Jennifer Lee", email: "jennifer.l@example.com", funnelStage: "MOFU", lastActive: "45 mins ago", engagement: 68, aiMessage: { subject: "Jennifer, see how our solution can benefit you", body: "Hi Jennifer,\n\nBased on your recent activity, here's what could help:\n\n✓ How our solution drives results\n✓ Real ROI metrics from similar businesses\n✓ No-strings-attached consultation\n\nReady to see the impact?", cta: "Schedule Demo", channel: "Email" } },
      { id: "m1", name: "Kevin Park", email: "kevin.p@example.com", funnelStage: "MOFU", lastActive: "2 hours ago", engagement: 75, aiMessage: { subject: "Kevin, your demo is ready", body: "Hi Kevin,\n\nYour personalized demo is ready. See how we can help your business grow!", cta: "Watch Demo", channel: "Email" } },
      { id: "m2", name: "Laura Adams", email: "laura.a@example.com", funnelStage: "MOFU", lastActive: "1 day ago", engagement: 71, aiMessage: { subject: "Laura, let's talk strategy", body: "Hey Laura! 🎯\n\nReady to discuss your marketing strategy? Book a call with us!", cta: "Book Call", channel: "SMS" } },
      { id: "m3", name: "Mark Johnson", email: "mark.j@example.com", funnelStage: "MOFU", lastActive: "30 mins ago", engagement: 69, aiMessage: { subject: "Mark, ROI insights inside", body: "Hi Mark,\n\nCheck out these ROI insights from businesses like yours!", cta: "View Insights", channel: "Email" } },
      { id: "m4", name: "Sandra Lee", email: "sandra.l@example.com", funnelStage: "MOFU", lastActive: "3 hours ago", engagement: 74, aiMessage: { subject: "Sandra, your consultation awaits", body: "👋 Sandra!\n\nReady for your free consultation? Let's chat about your goals!", cta: "Schedule Now", channel: "WhatsApp" } },
      { id: "m5", name: "Brian Hall", email: "brian.h@example.com", funnelStage: "MOFU", lastActive: "1 hour ago", engagement: 70, aiMessage: { subject: "Brian, solution overview", body: "Hi Brian,\n\nHere's a detailed overview of how our solution works for you.", cta: "Read More", channel: "Email" } },
      { id: "m6", name: "Rachel Green", email: "rachel.g@example.com", funnelStage: "MOFU", lastActive: "4 hours ago", engagement: 73, aiMessage: { subject: "Rachel, success stories", body: "Hey Rachel! 🌟\n\nSee how others succeeded with our platform. Get inspired!", cta: "Read Stories", channel: "SMS" } },
      { id: "m7", name: "Steve Clark", email: "steve.c@example.com", funnelStage: "MOFU", lastActive: "2 hours ago", engagement: 67, aiMessage: { subject: "Steve, comparison guide", body: "Hi Steve,\n\nHere's a comparison guide to help you make the best choice!", cta: "View Guide", channel: "Email" } },
      { id: "m8", name: "Amy Wong", email: "amy.w@example.com", funnelStage: "MOFU", lastActive: "5 hours ago", engagement: 76, aiMessage: { subject: "Amy, ready to commit?", body: "👋 Amy!\n\nYou're so close to transforming your marketing. Let's do this!", cta: "Get Started", channel: "WhatsApp" } },
      { id: "m9", name: "Paul Martinez", email: "paul.m@example.com", funnelStage: "MOFU", lastActive: "1 hour ago", engagement: 66, aiMessage: { subject: "Paul, final steps", body: "Hi Paul,\n\nHere are the final steps to get you started with our platform!", cta: "Complete Setup", channel: "Email" } },
      { id: "m10", name: "Tina Brown", email: "tina.b@example.com", funnelStage: "MOFU", lastActive: "30 mins ago", engagement: 78, aiMessage: { subject: "Tina, exclusive offer", body: "Hey Tina! 🎁\n\nSpecial offer just for you. Don't miss out!", cta: "Claim Offer", channel: "SMS" } },
    ],
    BOFU: [
      { id: "5", name: "Jessica Williams", email: "jessica.w@example.com", funnelStage: "BOFU", lastActive: "30 mins ago", engagement: 89, aiMessage: { subject: "Jessica, complete your demo", body: "Hi Jessica,\n\nYou're close to unlocking success. Here's your final step:\n\n✓ Book your personalized demo (15 mins)\n✓ Get 30-day free trial\n✓ Direct support from our team\n\nDon't miss this.", cta: "Get Started Now", channel: "Email" } },
      { id: "6", name: "Alex Thompson", email: "alex.t@example.com", funnelStage: "BOFU", lastActive: "1 hour ago", engagement: 91, aiMessage: { subject: "Alex, your exclusive offer awaits", body: "Alex! 🎉\n\nYou're this close to unlocking amazing results!\n\nFinal step: Let's chat about what matters most to you. Free, no pressure. ✨", cta: "Book demo", channel: "Messenger" } },
      { id: "10", name: "James Wilson", email: "james.w@example.com", funnelStage: "BOFU", lastActive: "15 mins ago", engagement: 94, aiMessage: { subject: "James, claim your exclusive offer now", body: "Hi James,\n\nYou're this close to unlocking amazing results!\n\nFinal step: Let's chat about what matters most to you. Free, no pressure. ✨", cta: "Get Started Now", channel: "Email" } },
      { id: "b1", name: "Michelle Lee", email: "michelle.l@example.com", funnelStage: "BOFU", lastActive: "10 mins ago", engagement: 92, aiMessage: { subject: "Michelle, final step", body: "Hi Michelle,\n\nJust one step away from transforming your business. Complete your setup now!", cta: "Complete Now", channel: "Email" } },
      { id: "b2", name: "Andrew Scott", email: "andrew.s@example.com", funnelStage: "BOFU", lastActive: "20 mins ago", engagement: 88, aiMessage: { subject: "Andrew, exclusive deal", body: "Hey Andrew! 🎉\n\nYour exclusive deal expires soon. Don't miss out!", cta: "Claim Deal", channel: "SMS" } },
      { id: "b3", name: "Kelly Chen", email: "kelly.c@example.com", funnelStage: "BOFU", lastActive: "1 hour ago", engagement: 90, aiMessage: { subject: "Kelly, ready to convert?", body: "Hi Kelly,\n\nYou're ready to convert. Let's make it happen today!", cta: "Start Now", channel: "Email" } },
      { id: "b4", name: "Jason Miller", email: "jason.m@example.com", funnelStage: "BOFU", lastActive: "30 mins ago", engagement: 93, aiMessage: { subject: "Jason, your trial awaits", body: "👋 Jason!\n\nYour 30-day free trial is ready. Start exploring now!", cta: "Start Trial", channel: "WhatsApp" } },
      { id: "b5", name: "Monica Geller", email: "monica.g@example.com", funnelStage: "BOFU", lastActive: "45 mins ago", engagement: 87, aiMessage: { subject: "Monica, special bonus", body: "Hi Monica,\n\nSign up today and get a special bonus package!", cta: "Get Bonus", channel: "Email" } },
      { id: "b6", name: "Eric Johnson", email: "eric.j@example.com", funnelStage: "BOFU", lastActive: "2 hours ago", engagement: 95, aiMessage: { subject: "Eric, let's close the deal", body: "Hey Eric! 🚀\n\nReady to close this deal? We're here to help!", cta: "Contact Sales", channel: "SMS" } },
      { id: "b7", name: "Helen Park", email: "helen.p@example.com", funnelStage: "BOFU", lastActive: "15 mins ago", engagement: 86, aiMessage: { subject: "Helen, last chance", body: "Hi Helen,\n\nThis is your last chance to get our exclusive offer!", cta: "Claim Now", channel: "Email" } },
      { id: "b8", name: "Matt Davis", email: "matt.d@example.com", funnelStage: "BOFU", lastActive: "1 hour ago", engagement: 96, aiMessage: { subject: "Matt, VIP access", body: "👋 Matt!\n\nGet VIP access to our premium features. Join now!", cta: "Get VIP", channel: "WhatsApp" } },
      { id: "b9", name: "Olivia Brown", email: "olivia.b@example.com", funnelStage: "BOFU", lastActive: "30 mins ago", engagement: 85, aiMessage: { subject: "Olivia, ready to launch?", body: "Hi Olivia,\n\nReady to launch your campaign? Let's go live today!", cta: "Launch Now", channel: "Email" } },
      { id: "b10", name: "Sam Wilson", email: "sam.w@example.com", funnelStage: "BOFU", lastActive: "10 mins ago", engagement: 97, aiMessage: { subject: "Sam, congratulations!", body: "Hey Sam! 🎊\n\nYou're about to join 1000+ successful marketers. Welcome aboard!", cta: "Complete Signup", channel: "SMS" } },
    ]
  };
  return baseUsers[stage] || [];
};

const getChannelMessage = (users: UserWithMessage[], channel: string) => {
  const user = users[0];
  if (!user) return { subject: "", body: "", cta: "Send" };
  
  const multiUserText = users.length > 1 ? `(${users.length} users)` : "";
  
  const messages: Record<string, { subject: string; body: string; cta: string }> = {
    Email: {
      subject: user.aiMessage.subject,
      body: user.aiMessage.body,
      cta: "Send Email"
    },
    SMS: {
      subject: "",
      body: `${user.name}, ${user.aiMessage.body.split('\n')[0]} Reply STOP to opt out.`,
      cta: "Send SMS"
    },
    WhatsApp: {
      subject: "",
      body: `👋 Hi ${user.name}!\n\n${user.aiMessage.body.split('\n')[0]}\n\nWant to learn more? Just reply! ✨`,
      cta: "Send WhatsApp"
    },
    Push: {
      subject: user.aiMessage.subject.split(':')[0] || "Notification",
      body: `${user.aiMessage.body.split('\n')[0]} Tap to open →`,
      cta: "Send Push"
    }
  };
  const msg = messages[channel] || messages.Email;
  return {
    subject: msg.subject,
    body: msg.body,
    cta: `${msg.cta} ${multiUserText}`
  };
};

export default function FunnelUsers() {
  const { stage } = useParams<{ stage: string }>();
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<string>("Email");
  const [messageOpen, setMessageOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(20);
  const [hasMore, setHasMore] = useState(true);
  const [sent, setSent] = useState(false);
  
  const users = generateMockUsers(stage || "TOFU");
  const displayUsers = users.slice(0, displayLimit);
  
  // Auto-load on scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      if (
        container.scrollHeight - container.scrollTop - container.clientHeight < 100 &&
        hasMore &&
        users.length > displayLimit
      ) {
        const newLimit = displayLimit + 20;
        setDisplayLimit(newLimit);
        if (newLimit >= users.length) {
          setHasMore(false);
        }
      }
    };
    
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [displayLimit, hasMore, users.length]);
  
  // Reset when stage changes
  useEffect(() => {
    setSelectedUsers([]);
    setSelectAll(false);
    setDisplayLimit(20);
    setHasMore(users.length > 20);
  }, [stage, users.length]);
  
  const handleUserSelect = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };
  
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(u => u.id));
    }
    setSelectAll(!selectAll);
  };
  
  const handleGenerateMessage = () => {
    if (selectedUsers.length > 0) {
      setMessageOpen(true);
    }
  };
  
  const handleSendMessage = () => {
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setMessageOpen(false);
      setSelectedUsers([]);
      setSelectAll(false);
    }, 1500);
  };
  
  const selectedUsersData = users.filter(u => selectedUsers.includes(u.id));
  const msg = getChannelMessage(selectedUsersData, selectedChannel);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{stage} Users</h1>
                <p className="text-xs text-primary font-semibold">
                  {users.length} users • {selectedUsers.length} selected
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Showing {displayUsers.length} of {users.length} users
            </span>
          </div>
          <button
            onClick={handleGenerateMessage}
            disabled={selectedUsers.length === 0}
            className={`px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all ${
              selectedUsers.length === 0
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Generate AI Message {selectedUsers.length > 0 && `(${selectedUsers.length})`}
          </button>
        </div>
        
        {/* Users Table */}
        <div 
          ref={scrollContainerRef}
          className="bg-card rounded-lg border border-border overflow-hidden max-h-[65vh] overflow-y-auto"
        >
          <table className="w-full">
            <thead className="bg-muted sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left w-12">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-border"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">User</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Engagement</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {displayUsers.map((user) => (
                <tr key={user.id} className="hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleUserSelect(user.id)}
                      className="w-4 h-4 rounded border-border"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-semibold text-primary">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium text-foreground">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold text-primary">{user.engagement}%</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{user.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Loading indicator */}
          {hasMore && users.length > 10 && (
            <div className="py-4 text-center">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                Loading more...
              </div>
            </div>
          )}
          
          {!hasMore && users.length > 10 && (
            <div className="py-4 text-center text-sm text-muted-foreground">
              All {users.length} users loaded
            </div>
          )}
        </div>
      </main>
      
      {/* AI Message Modal */}
      {messageOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">AI-Generated Message</h2>
                  <p className="text-sm text-muted-foreground">
                    Personalized message for {selectedUsers.length} selected user{selectedUsers.length > 1 ? 's' : ''}
                  </p>
                </div>
                <button
                  onClick={() => setMessageOpen(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Channel Tabs - Icons Only */}
              <div className="flex gap-1 bg-muted rounded-lg p-1">
                {channels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <button
                      key={channel.id}
                      onClick={() => setSelectedChannel(channel.id)}
                      title={channel.label}
                      className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md transition-all ${
                        selectedChannel === channel.id
                          ? 'bg-card text-primary shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  );
                })}
              </div>
              
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  AI-Generated {selectedChannel} Message
                </span>
              </div>
              
              <div className="bg-muted/50 rounded-lg border border-border p-4">
                {msg.subject && (
                  <p className="text-sm font-medium text-foreground mb-2">{msg.subject}</p>
                )}
                <p className="text-sm text-muted-foreground whitespace-pre-line">{msg.body}</p>
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Funnel Stage:</span>
                  <span className="px-2 py-1 rounded-full bg-secondary/20 text-secondary-foreground text-xs font-medium">
                    {stage}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Selected Users</p>
                  <p className="text-sm font-semibold text-primary">{selectedUsers.length}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-border flex justify-end gap-3">
              <button
                onClick={() => setMessageOpen(false)}
                className="px-4 py-2 border border-border rounded-lg text-foreground font-semibold hover:bg-muted transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleSendMessage}
                disabled={sent}
                className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all ${
                  sent 
                    ? 'bg-green-500 text-white' 
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {sent ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Sent!
                  </>
                ) : (
                  <>
                    <SendIcon className="w-4 h-4" />
                    {msg.cta}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
