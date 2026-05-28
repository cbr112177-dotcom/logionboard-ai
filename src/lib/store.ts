// One-click data store — no Convex, no database, no API keys needed
// Everything persists in localStorage and works instantly

export interface Employee {
  id: string; companyId: string; firstName: string; lastName: string;
  email: string; phone: string; role: string; status: string;
  onboardingProgress: number; complianceScore: number; startDate: string; createdAt: number;
}

export interface Document_ {
  id: string; employeeId: string; type: string; fileName: string; status: string;
}

export interface CheckIn {
  id: string; employeeId: string; type: string; status: string; score: number | null; date: string;
}

export interface TrainingProgress {
  employeeId: string; moduleId: string; completed: boolean; score: number;
}

export interface Company {
  id: string; name: string; email: string; phone: string; location: string; logo: string;
  stripeConnected: boolean; subscriptionTier: string;
}

const KEYS = {
  employees: 'lo_employees', documents: 'lo_documents', checkins: 'lo_checkins',
  training: 'lo_training', company: 'lo_company', user: 'logionboard_user'
};

function get<T>(key: string, fallback: T): T {
  try { const d = localStorage.getItem(key); return d ? JSON.parse(d) : fallback; } catch { return fallback; }
}
function set(key: string, data: any) { localStorage.setItem(key, JSON.stringify(data)); }

function genId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

// Seed demo data on first visit
export function seedDemoData() {
  if (localStorage.getItem('lo_seeded')) return;
  
  set(KEYS.company, {
    id: 'company_1', name: 'CABRANCH Trucking', email: 'chris@cabranch.com',
    phone: '(555) 123-4567', location: 'Searcy, AR', logo: '',
    stripeConnected: false, subscriptionTier: 'growth'
  });

  const employees: Employee[] = [
    { id: 'emp_1', companyId: 'company_1', firstName: 'Mike', lastName: 'Jones', email: 'mike@example.com', phone: '(555) 111-1111', role: 'Driver', status: 'active', onboardingProgress: 100, complianceScore: 95, startDate: 'Jan 15, 2024', createdAt: Date.now() - 90000000 },
    { id: 'emp_2', companyId: 'company_1', firstName: 'Sarah', lastName: 'Smith', email: 'sarah@example.com', phone: '(555) 222-2222', role: 'Driver', status: 'onboarding', onboardingProgress: 60, complianceScore: 70, startDate: 'Mar 1, 2024', createdAt: Date.now() - 50000000 },
    { id: 'emp_3', companyId: 'company_1', firstName: 'David', lastName: 'Brown', email: 'david@example.com', phone: '(555) 333-3333', role: 'Admin', status: 'active', onboardingProgress: 100, complianceScore: 100, startDate: 'Feb 1, 2024', createdAt: Date.now() - 70000000 },
    { id: 'emp_4', companyId: 'company_1', firstName: 'Lisa', lastName: 'Davis', email: 'lisa@example.com', phone: '(555) 444-4444', role: 'Driver', status: 'onboarding', onboardingProgress: 30, complianceScore: 45, startDate: 'Mar 15, 2024', createdAt: Date.now() - 30000000 },
  ];
  set(KEYS.employees, employees);

  const docs: Document_[] = [
    { id: 'doc_1', employeeId: 'emp_1', type: 'I-9 Form', fileName: 'i9_mike.pdf', status: 'verified' },
    { id: 'doc_2', employeeId: 'emp_1', type: 'W-4 Form', fileName: 'w4_mike.pdf', status: 'verified' },
    { id: 'doc_3', employeeId: 'emp_1', type: "Driver's License", fileName: 'dl_mike.pdf', status: 'verified' },
    { id: 'doc_4', employeeId: 'emp_1', type: 'DOT Medical Card', fileName: 'med_mike.pdf', status: 'verified' },
    { id: 'doc_5', employeeId: 'emp_2', type: 'I-9 Form', fileName: 'i9_sarah.pdf', status: 'uploaded' },
    { id: 'doc_6', employeeId: 'emp_2', type: "Driver's License", fileName: '', status: 'pending' },
    { id: 'doc_7', employeeId: 'emp_3', type: 'Drug Screen', fileName: 'drug_david.pdf', status: 'flagged' },
    { id: 'doc_8', employeeId: 'emp_4', type: 'DOT Medical Card', fileName: '', status: 'pending' },
  ];
  set(KEYS.documents, docs);

  const checkins: CheckIn[] = [
    { id: 'ci_1', employeeId: 'emp_1', type: '90-Day', status: 'completed', score: 92, date: 'Mar 15, 2024' },
    { id: 'ci_2', employeeId: 'emp_2', type: '30-Day', status: 'pending', score: null, date: 'Apr 1, 2024' },
    { id: 'ci_3', employeeId: 'emp_3', type: '60-Day', status: 'completed', score: 78, date: 'Feb 20, 2024' },
  ];
  set(KEYS.checkins, checkins);

  const training: TrainingProgress[] = [
    { employeeId: 'emp_1', moduleId: 'safety', completed: true, score: 95 },
    { employeeId: 'emp_1', moduleId: 'operations', completed: true, score: 88 },
    { employeeId: 'emp_1', moduleId: 'policy', completed: false, score: 0 },
    { employeeId: 'emp_2', moduleId: 'safety', completed: true, score: 72 },
    { employeeId: 'emp_3', moduleId: 'safety', completed: true, score: 100 },
    { employeeId: 'emp_3', moduleId: 'operations', completed: true, score: 95 },
    { employeeId: 'emp_3', moduleId: 'policy', completed: true, score: 90 },
  ];
  set(KEYS.training, training);
  localStorage.setItem('lo_seeded', 'true');
}

// --- Company ---
export function getCompany(): Company { return get<Company>(KEYS.company, { id: '', name: 'My Company', email: '', phone: '', location: '', logo: '', stripeConnected: false, subscriptionTier: 'growth' }); }
export function updateCompany(data: Partial<Company>) { const c = getCompany(); set(KEYS.company, { ...c, ...data }); }

// --- Employees ---
export function getEmployees(): Employee[] { return get<Employee[]>(KEYS.employees, []); }
export function getEmployee(id: string): Employee | undefined { return getEmployees().find(e => e.id === id); }
export function addEmployee(e: Omit<Employee, 'id' | 'createdAt'>): Employee {
  const emp: Employee = { ...e, id: genId(), createdAt: Date.now() };
  const list = getEmployees(); list.push(emp); set(KEYS.employees, list); return emp;
}
export function updateEmployee(id: string, data: Partial<Employee>) {
  const list = getEmployees(); const idx = list.findIndex(e => e.id === id);
  if (idx >= 0) { list[idx] = { ...list[idx], ...data }; set(KEYS.employees, list); }
}

// --- Documents ---
export function getDocuments(employeeId?: string): Document_[] {
  const all = get<Document_[]>(KEYS.documents, []);
  return employeeId ? all.filter(d => d.employeeId === employeeId) : all;
}
export function addDocument(d: Omit<Document_, 'id'>): Document_ {
  const doc: Document_ = { ...d, id: genId() }; const list = get<Document_[]>(KEYS.documents, []); list.push(doc); set(KEYS.documents, list); return doc;
}

// --- Check-Ins ---
export function getCheckIns(): CheckIn[] { return get<CheckIn[]>(KEYS.checkins, []); }
export function addCheckIn(ci: Omit<CheckIn, 'id'>): CheckIn {
  const item: CheckIn = { ...ci, id: genId() }; const list = get<CheckIn[]>(KEYS.checkins, []); list.push(item); set(KEYS.checkins, list); return item;
}

// --- Training ---
export function getTrainingProgress(employeeId: string): TrainingProgress[] {
  return get<TrainingProgress[]>(KEYS.training, []).filter(t => t.employeeId === employeeId);
}
export function submitTrainingScore(employeeId: string, moduleId: string, score: number) {
  const list = get<TrainingProgress[]>(KEYS.training, []);
  const existing = list.find(t => t.employeeId === employeeId && t.moduleId === moduleId);
  if (existing) { existing.score = score; existing.completed = true; }
  else { list.push({ employeeId, moduleId, completed: true, score }); }
  set(KEYS.training, list);
}

// --- AI Chat ---
export const AI_RESPONSES: Record<string, string> = {
  "i-9": "I-9 forms must be completed within 3 business days of hire. Section 1 is for the employee, Section 2 is for the employer.",
  "cdl": "A valid Commercial Driver's License (CDL) is required for all drivers operating vehicles over 26,000 lbs. Class A is for combination vehicles, Class B for single vehicles.",
  "dot physical": "DOT physicals are valid for up to 24 months (or 12 months if the driver has certain health conditions). Must be performed by an FMCSA-certified medical examiner.",
  "training": "Our training modules cover Safety & Compliance, Daily Operations, and Company Policy. Each module includes a quiz with a 70% passing score.",
  "drug test": "DOT drug testing includes pre-employment, random, post-accident, reasonable suspicion, and return-to-duty testing. Standard panel tests for 5 substances.",
  "hazmat": "Hazmat endorsement requires additional testing, background check by TSA, and fingerprinting. Valid for 5 years.",
  "eld": "Electronic Logging Devices (ELDs) are required for all commercial vehicles that log Hours of Service. They must be FMCSA-registered.",
  "drug screen": "Pre-employment drug screening is required before a driver can begin safety-sensitive functions. Results typically take 24-72 hours.",
};
export function getAIResponse(query: string): string {
  const q = query.toLowerCase();
  for (const [key, reply] of Object.entries(AI_RESPONSES)) {
    if (q.includes(key)) return reply;
  }
  return "I can help with: I-9 forms, CDL requirements, DOT physicals, training modules, drug testing, hazmat, and ELD rules. What would you like to know?";
}
