// Sistem ierarhic de agenți

export type AgentType = 'sellix' | 'knexa' | 'vyral' | 'optimus' | 'appo' | 'metrix' | 'human';

export interface Agent {
  id: AgentType;
  name: string;
  description: string;
  canTransferTo: AgentType[];
  icon: string;
}

export const agents: Record<AgentType, Agent> = {
  sellix: {
    id: 'sellix',
    name: 'SELLIX',
    description: 'Sales AI - lead qualification and follow-ups',
    canTransferTo: ['knexa', 'metrix'],
    icon: '👔'
  },
  knexa: {
    id: 'knexa',
    name: 'KNEXA',
    description: 'Support AI - customer service 24/7',
    canTransferTo: ['metrix'],
    icon: '🛟'
  },
  vyral: {
    id: 'vyral',
    name: 'VYRAL',
    description: 'Marketing AI - content creation',
    canTransferTo: ['metrix'],
    icon: '📣'
  },
  optimus: {
    id: 'optimus',
    name: 'OPTIMUS',
    description: 'Personal AI - calendar & tasks',
    canTransferTo: ['metrix'],
    icon: '🧠'
  },
  appo: {
    id: 'appo',
    name: 'APPO',
    description: 'Booking AI - appointments',
    canTransferTo: ['metrix'],
    icon: '📅'
  },
  metrix: {
    id: 'metrix',
    name: 'METRIX',
    description: 'Business AI - supervisor',
    canTransferTo: ['human'],
    icon: '📊'
  },
  human: {
    id: 'human',
    name: 'Human Operator',
    description: 'Live agent',
    canTransferTo: [],
    icon: '👤'
  }
};

// Detectează intenția utilizatorului
export function detectIntent(message: string): AgentType {
  const lower = message.toLowerCase();
  
  if (lower.includes('buy') || lower.includes('price') || lower.includes('cost') || lower.includes('lead')) {
    return 'sellix';
  }
  if (lower.includes('help') || lower.includes('support') || lower.includes('problem') || lower.includes('issue')) {
    return 'knexa';
  }
  if (lower.includes('post') || lower.includes('social') || lower.includes('marketing') || lower.includes('content')) {
    return 'vyral';
  }
  if (lower.includes('calendar') || lower.includes('schedule') || lower.includes('task') || lower.includes('reminder')) {
    return 'optimus';
  }
  if (lower.includes('book') || lower.includes('appointment') || lower.includes('meeting') || lower.includes('call')) {
    return 'appo';
  }
  if (lower.includes('business') || lower.includes('kpi') || lower.includes('analytics') || lower.includes('report')) {
    return 'metrix';
  }
  if (lower.includes('human') || lower.includes('operator') || lower.includes('talk to person') || lower.includes('agent')) {
    return 'human';
  }
  
  // Default la knexa (support)
  return 'knexa';
}

// Verifică dacă un agent poate transfera la altul
export function canTransfer(from: AgentType, to: AgentType): boolean {
  if (from === to) return true;
  const agent = agents[from];
  return agent.canTransferTo.includes(to);
}

// Obține calea de escaladare
export function getEscalationPath(from: AgentType, to: AgentType): AgentType[] {
  // Escaladare ierarhică: level 1 -> METRIX -> HUMAN
  if (from === 'sellix' || from === 'knexa' || from === 'vyral' || from === 'optimus' || from === 'appo') {
    if (to === 'metrix') return [from, 'metrix'];
    if (to === 'human') return [from, 'metrix', 'human'];
  }
  if (from === 'metrix' && to === 'human') return ['metrix', 'human'];
  
  return [from];
}
