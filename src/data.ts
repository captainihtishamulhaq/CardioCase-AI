import { ClinicalCase, TopicExplanation, MCQQuestion, VivaQuestion, NotesSummary } from './types';

// Sample pre-built Clinical Cases
export const SAMPLE_CASES: ClinicalCase[] = [
  {
    id: 'case_1',
    title: 'Acute Chest Pain in a 58-Year-Old Male',
    demographics: '58-year-old male with history of hypertension, hyperlipidemia, and 30 pack-year smoking.',
    symptoms: 'Substernal, crushing chest pain radiating to the left arm and jaw, starting 2 hours ago. Associated with diaphoresis, nausea, and mild dyspnea. Not relieved by sublingual nitroglycerin.',
    differentials: [
      {
        diagnosis: 'Acute Coronary Syndrome (STEMI / NSTEMI)',
        probability: 'High',
        rationale: 'Crushing retrosternal chest pain with classic radiation, risk factors (smoking, HTN, HLD), and lack of relief with nitroglycerin strongly indicates myocardial ischemia.'
      },
      {
        diagnosis: 'Acute Pericarditis',
        probability: 'Moderate',
        rationale: 'Can present with chest pain, but typical pericarditic pain is sharp, pleuritic, and relieved by sitting forward, which is absent here.'
      },
      {
        diagnosis: 'Acute Aortic Dissection',
        probability: 'Low',
        rationale: 'Typically presents with sudden, tearing, or ripping chest pain radiating to the back. Less likely but a critical emergency.'
      }
    ],
    investigations: [
      {
        test: '12-Lead Electrocardiogram (ECG)',
        expectedFindings: 'ST-segment elevations, ST depressions, hyperacute T-waves, or new LBBB.',
        priority: 'Immediate'
      },
      {
        test: 'Cardiac Troponins (I or T)',
        expectedFindings: 'Elevated troponin levels indicating myocardial necrosis (serial measurements recommended).',
        priority: 'Immediate'
      },
      {
        test: 'Bedside Echocardiogram',
        expectedFindings: 'Regional wall motion abnormalities (RWMA), evaluation of ejection fraction.',
        priority: 'Routine'
      },
      {
        test: 'Chest X-Ray (CXR)',
        expectedFindings: 'Rule out widened mediastinum (aortic dissection) and signs of pulmonary edema.',
        priority: 'Routine'
      }
    ],
    learningPoints: [
      'Time is muscle: Primary Percutaneous Coronary Intervention (PCI) should be initiated within 90 minutes of first medical contact for STEMI.',
      'Aspirin (324mg chewed) should be administered immediately unless contraindicated.',
      'Always obtain a 12-lead ECG within 10 minutes of arrival for any patient presenting with acute chest pain.'
    ],
    redFlags: [
      'Hemodynamic instability (hypotension, cardiogenic shock)',
      'New-onset third heart sound (S3) or mitral regurgitation murmur',
      'Refractory chest pain despite medical therapy',
      'Sustained ventricular arrhythmias (VT/VF)'
    ]
  },
  {
    id: 'case_2',
    title: 'Pleuritic Chest Pain in a 24-Year-Old Female',
    demographics: '24-year-old female medical student, recently recovered from a viral upper respiratory tract infection.',
    symptoms: 'Sharp, retrosternal chest pain that worsens when breathing deeply (pleuritic) and lying flat on her back. The pain improves significantly when she sits up and leans forward. Mild fever (38.1°C) and friction rub heard at the left lower sternal border.',
    differentials: [
      {
        diagnosis: 'Acute Pericarditis',
        probability: 'High',
        rationale: 'Classic positional chest pain (better sitting forward), friction rub, and recent history of viral illness are pathognomonic for viral or idiopathic pericarditis.'
      },
      {
        diagnosis: 'Myocarditis',
        probability: 'Moderate',
        rationale: 'Commonly co-exists with pericarditis (myopericarditis). Elevated troponins and new ventricular dysfunction would support this.'
      },
      {
        diagnosis: 'Pulmonary Embolism (PE)',
        probability: 'Low',
        rationale: 'Can present with pleuritic chest pain, but usually accompanied by acute dyspnea, tachycardia, and risk factors (oral contraceptives, immobility).'
      }
    ],
    investigations: [
      {
        test: '12-Lead ECG',
        expectedFindings: 'Diffuse, concave-upward ST elevations with PR segment depression (particularly in Lead II, aVF, and V2-V6) and PR elevation in aVR.',
        priority: 'Immediate'
      },
      {
        test: 'Echocardiogram',
        expectedFindings: 'May show pericardial effusion; helps rule out tamponade physiology.',
        priority: 'Immediate'
      },
      {
        test: 'Inflammatory Markers (CRP, ESR)',
        expectedFindings: 'Elevated C-reactive protein and Erythrocyte Sedimentation Rate indicating active inflammation.',
        priority: 'Routine'
      }
    ],
    learningPoints: [
      'First-line treatment for acute viral/idiopathic pericarditis is High-dose NSAIDs (e.g., Ibuprofen 600-800mg tid) plus Colchicine (0.5-0.6mg daily or bid) for 3 months to prevent recurrence.',
      'Aspirin is preferred over standard NSAIDs if pericarditis occurs post-myocardial infarction (Dressler syndrome).',
      'Widespread ST-segment elevation in pericarditis is diffuse and does not follow single coronary artery territories, unlike STEMI.'
    ],
    redFlags: [
      'Muffled heart sounds, jugular venous distension, and hypotension (Beck’s Triad for Cardiac Tamponade)',
      'Electrical alternans on ECG',
      'Failure to respond to NSAID therapy within 1 week'
    ]
  },
  {
    id: 'case_3',
    title: 'Progressive Dyspnea in a 72-Year-Old Female',
    demographics: '72-year-old female with long-standing poorly controlled hypertension and ischemic heart disease.',
    symptoms: 'Gradual worsening of shortness of breath over 3 weeks, now occurring with minimal exertion. Complains of having to sleep propped up on 3 pillows (orthopnea) and waking up gasping for air at 2 AM (paroxysmal nocturnal dyspnea). Notable bilateral ankle swelling.',
    differentials: [
      {
        diagnosis: 'Congestive Heart Failure (CHF) - Acute Decompensated',
        probability: 'High',
        rationale: 'Bilateral pitting ankle edema, orthopnea, PND, and history of hypertension are highly characteristic of volume overload from heart failure.'
      },
      {
        diagnosis: 'Chronic Obstructive Pulmonary Disease (COPD) Exacerbation',
        probability: 'Moderate',
        rationale: 'Can present with progressive dyspnea, but orthopnea, PND, and bilateral pitting peripheral edema point strongly to a cardiogenic source.'
      },
      {
        diagnosis: 'Severe Aortic Stenosis',
        probability: 'Moderate',
        rationale: 'Common in this age group, can precipitate heart failure. Classic systolic murmur would assist in diagnosis.'
      }
    ],
    investigations: [
      {
        test: 'Brain Natriuretic Peptide (BNP or NT-proBNP)',
        expectedFindings: 'Markedly elevated levels indicating myocardial stretch from volume overload.',
        priority: 'Immediate'
      },
      {
        test: 'Transthoracic Echocardiogram (TTE)',
        expectedFindings: 'Reduced Left Ventricular Ejection Fraction (HFrEF) or preserved ejection fraction with diastolic dysfunction (HFpEF).',
        priority: 'Immediate'
      },
      {
        test: 'Chest X-Ray (CXR)',
        expectedFindings: 'Cardiomegaly, cephalization of pulmonary vessels, Kerley B lines, and pleural effusions.',
        priority: 'Routine'
      }
    ],
    learningPoints: [
      'Initial stabilization requires intravenous Loop Diuretics (e.g., Furosemide) to reduce preload, and oxygen therapy.',
      'Guideline-directed medical therapy (GDMT) for HFrEF includes "The Four Pillars": Beta-blockers, ARNI/ACEi/ARB, MRA (Spironolactone), and SGLT2 inhibitors.',
      'Avoid initiating or up-titrating beta-blockers during an acute decompensation state until the patient is euvolemic.'
    ],
    redFlags: [
      'Severe respiratory distress requiring non-invasive ventilation (NIV) or intubation',
      'Cardiogenic shock (hypotension, cold clammy extremities, worsening renal function)',
      'Refractory hyperkalemia or worsening pre-renal azotemia with diuretic resistance'
    ]
  }
];

// Sample pre-built Topics
export const SAMPLE_TOPICS: { [key: string]: TopicExplanation } = {
  'atrial fibrillation': {
    topic: 'Atrial Fibrillation (AF)',
    definition: 'Atrial Fibrillation is a supraventricular tachyarrhythmia characterized by uncoordinated atrial activation with consequent deterioration of atrial mechanical function, presenting on ECG as a totally irregular rhythm with absent P-waves.',
    causes: [
      'Hypertension (most common predisposing factor)',
      'Coronary Artery Disease (CAD)',
      'Valvular heart disease (especially Mitral Stenosis)',
      'Hyperthyroidism',
      'Alcohol use (the "Holiday Heart" syndrome)',
      'Obstructive Sleep Apnea (OSA)'
    ],
    symptoms: [
      'Palpitations (often described as irregular thumping or fluttering)',
      'Fatigue and generalized weakness',
      'Shortness of breath (dyspnea)',
      'Dizziness or lightheadedness',
      'Chest discomfort or exercise intolerance'
    ],
    diagnosis: [
      '12-Lead ECG: Irregularly irregular rhythm (variable R-R intervals), absence of distinct P-waves, replaced by rapid, chaotic fibrillatory (f) waves.',
      'Echocardiogram: Used to evaluate left atrial size, look for valvular disease, and screen for left atrial thrombus (especially in the appendage).',
      'Thyroid Function Tests (TSH, Free T4): Essential initial screen to rule out hyperthyroidism.'
    ],
    management: [
      'Rate Control: Beta-blockers (e.g., Metoprolol), Non-dihydropyridine Calcium Channel Blockers (e.g., Diltiazem, Verapamil), or Digoxin.',
      'Rhythm Control: Antiarrhythmic drugs (Amiodarone, Flecainide) or electrical/pharmacological cardioversion.',
      'Stroke Prevention: Oral Anticoagulation (DOACs like Apixaban, Rivaroxaban or Warfarin) based on the CHA₂DS₂-VASc Risk Score.',
      'Rate vs. Rhythm decision depends on symptom severity, duration of AF, and patient comorbidities.'
    ],
    mnemonics: [
      {
        phrase: 'PIRATES (Causes of Atrial Fibrillation)',
        expansion: [
          { key: 'P', text: 'Pulmonary disease (PE, COPD)' },
          { key: 'I', text: 'Ischemia / Infarction (CAD)' },
          { key: 'R', text: 'Rheumatic heart disease (Mitral Stenosis)' },
          { key: 'A', text: 'Anemia / Atrial myxoma' },
          { key: 'T', text: 'Thyrotoxicosis (Hyperthyroidism)' },
          { key: 'E', text: 'Ethanol (Holiday Heart Syndrome)' },
          { key: 'S', text: 'Sepsis / Surgery' }
        ]
      },
      {
        phrase: 'CHA₂DS₂-VASc (Stroke Risk Score in AF)',
        expansion: [
          { key: 'C', text: 'Congestive Heart Failure (+1)' },
          { key: 'H', text: 'Hypertension (+1)' },
          { key: 'A₂', text: 'Age ≥ 75 years (+2)' },
          { key: 'D', text: 'Diabetes Mellitus (+1)' },
          { key: 'S₂', text: 'Stroke / TIA / Thromboembolism history (+2)' },
          { key: 'V', text: 'Vascular Disease - prior MI, PAD (+1)' },
          { key: 'A', text: 'Age 65-74 years (+1)' },
          { key: 'Sc', text: 'Sex category: Female (+1)' }
        ]
      }
    ]
  },
  'infective endocarditis': {
    topic: 'Infective Endocarditis (IE)',
    definition: 'Infective Endocarditis is an infection of the endocardial surface of the heart, usually involving the heart valves. It occurs when circulating microorganisms adhere to damaged endocardial tissue or prosthetic materials.',
    causes: [
      'Staphylococcus aureus (most common overall, highly virulent, typical in IV drug users)',
      'Streptococcus viridans (common in subacute cases, associated with dental procedures)',
      'Enterococcus faecalis (associated with GU or GI procedures)',
      'HACEK organisms (Haemophilus, Aggregatibacter, Cardiobacterium, Eikenella, Kingella) - culture-negative endocarditis'
    ],
    symptoms: [
      'Fever of unknown origin (present in 90%)',
      'New or changing heart murmur (usually regurgitant)',
      'Splinter hemorrhages in the nail beds',
      'Osler nodes (tender, painful nodules on finger/toe pads)',
      'Janeway lesions (non-tender, erythematous macules on palms/soles)',
      'Roth spots (retinal hemorrhages with pale centers)'
    ],
    diagnosis: [
      'Modified Duke Criteria: Requires 2 major criteria, 1 major + 3 minor, or 5 minor criteria.',
      'Major Criteria: Positive blood cultures (2 separate cultures for typical pathogens), Echocardiographic evidence of endocardial involvement (vegetation, abscess, or new valvular regurgitation).',
      'Minor Criteria: Predisposition (IV drug use, heart disease), Fever ≥ 38°C, Vascular phenomena (Janeway lesions, emboli), Immunological phenomena (Osler nodes, Roth spots, positive RF).'
    ],
    management: [
      'Targeted, long-term intravenous antibiotics (typically 4 to 6 weeks) guided by culture sensitivity.',
      'Empiric therapy: Vancomycin + Gentamicin covers most gram-positive cocci.',
      'Surgical intervention is indicated for: Refractory heart failure, uncontrolled infection despite optimal antibiotics, recurrent emboli with large vegetations (>10mm), or valve abscess.'
    ],
    mnemonics: [
      {
        phrase: 'FROM JANE (Clinical Features of Endocarditis)',
        expansion: [
          { key: 'F', text: 'Fever' },
          { key: 'R', text: 'Roth spots' },
          { key: 'O', text: 'Osler nodes' },
          { key: 'M', text: 'Murmur (new/changing)' },
          { key: 'J', text: 'Janeway lesions' },
          { key: 'A', text: 'Anemia' },
          { key: 'N', text: 'Nail splinter hemorrhages' },
          { key: 'E', text: 'Emboli (septic pulmonary or systemic)' }
        ]
      }
    ]
  },
  'aortic stenosis': {
    topic: 'Aortic Stenosis (AS)',
    definition: 'Aortic Stenosis is a valvular heart disease characterized by narrowing of the aortic valve orifice, restricting blood flow from the left ventricle into the aorta during systole, leading to pressure overload hypertrophy.',
    causes: [
      'Age-related calcification (most common in patients >70 years old)',
      'Congenital Bicuspid Aortic Valve (presents earlier, usually in 50s-60s)',
      'Rheumatic Heart Disease (common in developing countries, typically affects both mitral and aortic valves)'
    ],
    symptoms: [
      'Exertional Dyspnea (due to heart failure from pressure overload)',
      'Angina Pectoris (increased oxygen demand of hypertrophied muscle exceed supply)',
      'Exertional Syncope (inability to increase cardiac output in response to exercise, causing cerebral hypoperfusion)'
    ],
    diagnosis: [
      'Physical Exam: Harsh, mid-systolic, crescendo-decrescendo murmur heard best at the right second intercostal space, radiating to the carotids. Weak, delayed carotid pulse (Pulsus parvus et tardus).',
      'Echocardiography (Gold Standard): Valve area < 1.0 cm², Mean pressure gradient > 40 mmHg, or Jet velocity > 4.0 m/s defines severe aortic stenosis.'
    ],
    management: [
      'Surgical Aortic Valve Replacement (SAVR): Open cardiac surgery, preferred in younger, low-risk patients.',
      'Transcatheter Aortic Valve Replacement (TAVR): Minimally invasive endovascular procedure, highly successful in elderly or high-risk surgical candidates.',
      'Medical management is limited. Avoid strong vasodilators (like Nitroglycerin) in severe, symptomatic AS as they can crash blood pressure.'
    ],
    mnemonics: [
      {
        phrase: 'SAD (Cardinal Symptoms of Aortic Stenosis)',
        expansion: [
          { key: 'S', text: 'Syncope (exertional)' },
          { key: 'A', text: 'Angina (exertional)' },
          { key: 'D', text: 'Dyspnea (exertional / heart failure onset)' }
        ]
      }
    ]
  }
};

// MCQ Database
export const SAMPLE_MCQS: MCQQuestion[] = [
  {
    id: 'q1',
    question: 'Which of the following is the diagnostic gold standard for assessing severe valvular stenosis?',
    options: [
      'Chest X-Ray',
      'Transthoracic Echocardiogram',
      'Electrocardiogram (ECG)',
      'Cardiac CT'
    ],
    correctIndex: 1,
    explanation: 'Transthoracic Echocardiography is the primary gold standard non-invasive investigation for evaluating heart valves, providing precise measurements of valve areas, pressure gradients, and cardiac velocities.'
  },
  {
    id: 'q2',
    question: 'A 65-year-old patient presents with syncope, angina, and dyspnea. On auscultation, a harsh systolic crescendo-decrescendo murmur is heard at the right upper sternal border radiating to the carotids. What is the most likely diagnosis?',
    options: [
      'Mitral Regurgitation',
      'Aortic Regurgitation',
      'Aortic Stenosis',
      'Mitral Stenosis'
    ],
    correctIndex: 2,
    explanation: 'The classic triad of symptoms (SAD: Syncope, Angina, Dyspnea) combined with a harsh crescendo-decrescendo murmur radiating to the carotids strongly diagnosticates severe Aortic Stenosis.'
  },
  {
    id: 'q3',
    question: 'Which ECG finding is highly characteristic of acute pericarditis?',
    options: [
      'ST-segment depression in anterior leads',
      'Diffuse concave-upward ST-segment elevation with PR-segment depression',
      'Prolonged QT interval',
      'Pathological Q-waves in inferior leads'
    ],
    correctIndex: 1,
    explanation: 'Acute pericarditis presents with diffuse, widespread concave-upward ST elevations along with PR-segment depression (except in Lead aVR, which shows PR elevation and ST depression).'
  },
  {
    id: 'q4',
    question: 'What is the target door-to-balloon time for a patient presenting with an Acute ST-elevation Myocardial Infarction (STEMI) at a PCI-capable facility?',
    options: [
      '30 minutes',
      '90 minutes',
      '120 minutes',
      '180 minutes'
    ],
    correctIndex: 1,
    explanation: 'According to ACC/AHA guidelines, the standard target door-to-balloon time for primary Percutaneous Coronary Intervention (PCI) in STEMI is within 90 minutes to preserve myocardial muscle.'
  },
  {
    id: 'q5',
    question: 'Which of the following drugs represents one of the "Four Pillars" of Guideline-Directed Medical Therapy (GDMT) for Heart Failure with reduced Ejection Fraction (HFrEF)?',
    options: [
      'SGLT2 inhibitors (e.g., Dapagliflozin)',
      'Amlodipine',
      'Aspirin',
      'Clopidogrel'
    ],
    correctIndex: 0,
    explanation: 'The four pillars of HFrEF medical management are: (1) SGLT2 inhibitors, (2) Beta-blockers, (3) ARNI/ACEi/ARB, and (4) Mineralocorticoid Receptor Antagonists (MRAs).'
  },
  {
    id: 'q6',
    question: 'What is the most common predisposing risk factor for developing Atrial Fibrillation?',
    options: [
      'Hyperthyroidism',
      'Hypertension',
      'Alcohol consumption',
      'Active myocarditis'
    ],
    correctIndex: 1,
    explanation: 'While all choices can cause or trigger AF, systemic hypertension is epidemiologically the most common underlying predisposing risk factor due to gradual left atrial enlargement over time.'
  },
  {
    id: 'q7',
    question: 'Which pathogen is the most common cause of acute, highly destructive infective endocarditis, particularly in intravenous drug users (IVDUs)?',
    options: [
      'Streptococcus viridans',
      'Staphylococcus aureus',
      'Enterococcus faecalis',
      'Coxiella burnetii'
    ],
    correctIndex: 1,
    explanation: 'Staphylococcus aureus is a highly virulent organism and is the most common cause of acute, severe infective endocarditis, frequently affecting normal tricuspid valves in IV drug users.'
  },
  {
    id: 'q8',
    question: 'Beck\'s Triad is a classic collection of three medical signs associated with cardiac tamponade. What are they?',
    options: [
      'Hypertension, Bradycardia, Irregular breathing',
      'Hypotension, Muffled heart sounds, Jugular venous distension (JVD)',
      'Fever, Splenomegaly, Janeway lesions',
      'Tachycardia, Pleuritic pain, Friction rub'
    ],
    correctIndex: 1,
    explanation: 'Beck\'s Triad for acute cardiac tamponade consists of low arterial blood pressure (hypotension), distended neck veins (JVD), and distant or muffled heart sounds.'
  },
  {
    id: 'q9',
    question: 'Which congenital heart disease is characterized by the tetrad of: ventricular septal defect, overriding aorta, pulmonary stenosis, and right ventricular hypertrophy?',
    options: [
      'Patent Ductus Arteriosus',
      'Coarctation of the Aorta',
      'Tetralogy of Fallot',
      'Transposition of the Great Arteries'
    ],
    correctIndex: 2,
    explanation: 'Tetralogy of Fallot is a classic cyanotic congenital cardiac defect defined by these four concurrent anatomical abnormalities.'
  },
  {
    id: 'q10',
    question: 'What is the primary action of Nitroglycerin in relieving stable angina?',
    options: [
      'Direct arterial constriction to increase blood pressure',
      'Venodilation reducing cardiac preload and ventricular wall tension',
      'Negative inotropic action slowing down heart rate',
      'Inhibition of platelet aggregation'
    ],
    correctIndex: 1,
    explanation: 'Nitroglycerin is primarily a venodilator. By dilating systemic veins, it reduces venous return (preload) to the heart, which lowers ventricular volume, wall stress, and myocardial oxygen demand.'
  }
];

// Sample Notes Summaries
export const SAMPLE_SUMMARIES: { [key: string]: NotesSummary } = {
  'coronary artery disease': {
    title: 'Coronary Artery Disease (CAD) & Ischemic Heart Disease',
    summary: 'Coronary Artery Disease involves the progressive narrowing of coronary arteries, most commonly due to atherosclerosis, resulting in mismatch of myocardial oxygen supply and demand. It ranges from Stable Angina to Acute Coronary Syndromes (Unstable Angina, NSTEMI, and STEMI).',
    keyPoints: [
      'Atherosclerosis is driven by lipid deposition in the arterial intima, chronic inflammatory infiltration, and fibrous cap formation.',
      'Stable Angina: Exertional chest discomfort, predictable, relieved by rest or sublingual nitroglycerin.',
      'ACS is typically precipitated by plaque rupture, exposing thrombogenic core material and leading to acute coronary thrombosis.'
    ],
    examTips: [
      'Understand the ECG criteria for STEMI: ≥ 1mm ST-elevation in ≥ 2 contiguous leads (except V2-V3, where age/sex specific cutoffs apply).',
      'Differentiate STEMI and NSTEMI by ECG elevations. Differentiate NSTEMI and Unstable Angina by cardiac troponin biomarkers (elevated in NSTEMI).'
    ]
  },
  'rheumatic fever': {
    title: 'Acute Rheumatic Fever & Rheumatic Heart Disease',
    summary: 'Acute Rheumatic Fever is an immunological sequela occurring 2-3 weeks after untreated Group A Beta-Hemolytic Streptococcus (S. pyogenes) pharyngitis. It is mediated by molecular mimicry where antibodies against streptococcal M protein cross-react with cardiac myosin and other host tissues.',
    keyPoints: [
      'The Jones Criteria is used for diagnosis (Requires 2 major OR 1 major + 2 minor criteria, plus evidence of preceding streptococcal infection).',
      'Carditis in Rheumatic Fever primarily manifests as pancarditis, affecting endocardium, myocardium, and pericardium.',
      'Rheumatic Heart Disease is the long-term consequence of recurrent episodes, leading to chronic scarring and fusion of heart valves (Mitral Stenosis is the classic long-term lesion).'
    ],
    examTips: [
      'Commit the Major Jones Criteria to memory: Joint (migratory polyarthritis), O (pancarditis), Nodules (subcutaneous), Erythema marginatum, Sydenham chorea.',
      'Always check for antistreptolysin O (ASO) titer or rapid strep test results as essential supportive evidence.'
    ]
  }
};

// Sample Viva Questions
export const SAMPLE_VIVA: VivaQuestion[] = [
  {
    id: 'v1',
    question: 'Can you explain the pathophysiological mechanism of molecular mimicry in Acute Rheumatic Fever?',
    modelAnswer: 'Acute Rheumatic Fever is a post-streptococcal autoimmune reaction caused by untreated pharyngitis from Group A Streptococcus. The M protein on the streptococcal cell wall contains epitopes structurally similar to host proteins, specifically cardiac myosin and valvular laminin. When the immune system generates antibodies against the streptococcal M protein, these antibodies cross-react with host cardiac tissues, leading to endocarditis, myocarditis, and subsequent valvular scarring (Rheumatic Heart Disease).',
    expectedKeywords: ['streptococcal', 'M protein', 'molecular mimicry', 'cross-react', 'myosin', 'valvular']
  },
  {
    id: 'v2',
    question: 'How would you clinically distinguish between Acute Myocardial Infarction and Acute Pericarditis chest pain?',
    modelAnswer: 'Myocardial infarction chest pain is classically substernal, heavy, crushing, or squeezing, often radiating to the left arm or jaw, and is not affected by respiration or body position. In contrast, pericarditis pain is usually sharp, pleuritic (worse on inspiration), and highly positional - worsening when lying flat and improving significantly when sitting up and leaning forward. On physical exam, pericarditis may present with a pericardial friction rub, and its ECG shows diffuse ST elevations rather than regional elevations.',
    expectedKeywords: ['pleuritic', 'positional', 'friction rub', 'diffuse', 'sitting forward', 'lying flat']
  },
  {
    id: 'v3',
    question: 'Explain the physiological compensation mechanisms that occur in Heart Failure with Reduced Ejection Fraction (HFrEF).',
    modelAnswer: 'When cardiac output drops in HFrEF, the body activates compensation pathways. First, the Sympathetic Nervous System (SNS) increases heart rate and contractility, and causes vasoconstriction. Second, the Renin-Angiotensin-Aldosterone System (RAAS) is activated by reduced renal perfusion, causing vasoconstriction (via Angiotensin II) and fluid retention (via Aldosterone) to increase preload. Third, ventricular remodeling/hypertrophy occurs to reduce wall stress. Over time, these chronic compensatory mechanisms become maladaptive, worsening heart failure.',
    expectedKeywords: ['sympathetic', 'RAAS', 'renin', 'aldosterone', 'vasoconstriction', 'fluid retention', 'remodeling']
  }
];

// Fallback dynamic generator functions for simulating custom queries
export function generateCustomClinicalCase(symptoms: string): ClinicalCase {
  const normalized = symptoms.toLowerCase();
  
  if (normalized.includes('palpitations') || normalized.includes('irregular') || normalized.includes('flutter')) {
    return {
      id: 'custom_case_af',
      title: 'Educational Case: Irregular Heart Rhythm',
      demographics: 'Representative 68-year-old patient presenting with rapid heart sensations.',
      symptoms: symptoms,
      differentials: [
        {
          diagnosis: 'Atrial Fibrillation with Rapid Ventricular Response (RVR)',
          probability: 'High',
          rationale: 'Palpitations described as highly irregular match atrial fibrillation, which is the most common sustained arrhythmia.'
        },
        {
          diagnosis: 'Supraventricular Tachycardia (SVT)',
          probability: 'Moderate',
          rationale: 'Usually presents with regular palpitations. Worth differentiating using ECG.'
        },
        {
          diagnosis: 'Premature Ventricular Contractions (PVCs)',
          probability: 'Moderate',
          rationale: 'Can feel like skipped beats or flutterings, usually benign but requires workup.'
        }
      ],
      investigations: [
        { test: '12-lead ECG', expectedFindings: 'Absence of P-waves, irregularly irregular QRS complexes.', priority: 'Immediate' },
        { test: 'Holter Monitor (24-48 hours)', expectedFindings: 'To catch transient arrhythmia episodes if baseline ECG is normal.', priority: 'Routine' },
        { test: 'Echocardiogram', expectedFindings: 'Excludes structural heart disease or thrombus in the left atrium.', priority: 'Routine' }
      ],
      learningPoints: [
        'Always calculate CHA₂DS₂-VASc score to gauge the need for oral anticoagulation.',
        'Beta-blockers or calcium channel blockers are standard first-line for rate control.'
      ],
      redFlags: [
        'Syncope or pre-syncope',
        'Hypotension indicating hemodynamic compromise',
        'Ischemic chest pain matching angina'
      ]
    };
  }

  if (normalized.includes('swelling') || normalized.includes('edema') || normalized.includes('breath') || normalized.includes('dyspnea')) {
    return {
      id: 'custom_case_hf',
      title: 'Educational Case: Cardiorespiratory Volume Overload',
      demographics: 'Representative 70-year-old patient with progressive dyspnea and peripheral swelling.',
      symptoms: symptoms,
      differentials: [
        {
          diagnosis: 'Decompensated Congestive Heart Failure',
          probability: 'High',
          rationale: 'Dyspnea coupled with ankle swelling/edema strongly indicates systemic volume overload of cardiac etiology.'
        },
        {
          diagnosis: 'Chronic Obstructive Pulmonary Disease Exacerbation',
          probability: 'Moderate',
          rationale: 'Can explain the dyspnea, though peripheral pitting edema is more characteristic of heart failure.'
        },
        {
          diagnosis: 'Chronic Venous Insufficiency',
          probability: 'Low',
          rationale: 'Explains bilateral swelling, but would not cause acute or progressive dyspnea.'
        }
      ],
      investigations: [
        { test: 'NT-proBNP Serum Level', expectedFindings: 'Elevated values, highly sensitive for heart failure diagnosis.', priority: 'Immediate' },
        { test: 'Transthoracic Echocardiogram', expectedFindings: 'Evaluates systolic (LVEF) and diastolic filling capacities.', priority: 'Immediate' },
        { test: 'Chest X-Ray', expectedFindings: 'Pulmonary venous congestion, Kerley B-lines, cardiomegaly.', priority: 'Routine' }
      ],
      learningPoints: [
        'Intravenous loop diuretics (Furosemide) are key to restoring euvolemia.',
        'Maintain close monitoring of serum potassium and renal function (BUN/Creatinine) during diuresis.'
      ],
      redFlags: [
        'Oxygen saturation dropping below 90% on room air',
        'Accessory muscle use for respiration',
        'Symptomatic hypotension (systolic BP < 90 mmHg)'
      ]
    };
  }

  // Default Fallback Case
  return {
    id: 'custom_case_general',
    title: 'Educational Case: Cardiology Symptom Evaluation',
    demographics: 'Adult learner clinical simulation patient based on input symptoms.',
    symptoms: symptoms || 'Atypical cardiopulmonary symptoms.',
    differentials: [
      {
        diagnosis: 'Atypical Coronary Artery Disease / Angina Equivalent',
        probability: 'Moderate',
        rationale: 'Any unexplained chest, neck, back, or epigastric discomfort in high-risk patients must be treated as ischemic until proven otherwise.'
      },
      {
        diagnosis: 'Gastroesophageal Reflux Disease (GERD) or Esophageal Spasm',
        probability: 'Moderate',
        rationale: 'Very common mimic of cardiogenic pain. Can respond to nitrates, creating false diagnostics.'
      },
      {
        diagnosis: 'Anxiety-Induced Hyperventilation Syndrome',
        probability: 'Moderate',
        rationale: 'Can cause atypical chest pressure, tingling in extremities, and tachypnea.'
      }
    ],
    investigations: [
      { test: 'Serial 12-lead ECGs', expectedFindings: 'Look for transient ischemic ST-T wave changes.', priority: 'Immediate' },
      { test: 'Serial Troponin Biomarkers', expectedFindings: 'Assesses for subclinical myocardial necrosis.', priority: 'Immediate' },
      { test: 'Exercise Stress ECG / Nuclear Stress Test', expectedFindings: 'Inducible ischemia or regional perfusion defects under load.', priority: 'Routine' }
    ],
    learningPoints: [
      'Atypical presentations are extremely common in female, elderly, and diabetic patients.',
      'Never discharge a patient with chest discomfort without a normal serial ECG and cardiac biomarkers.'
    ],
    redFlags: [
      'Pain radiating to both arms or back',
      'Syncope, severe sweating, or vomiting',
      'Prior medical history of coronary angioplasty or CABG'
    ]
  };
}

export function generateCustomTopicExplanation(topic: string): TopicExplanation {
  const norm = topic.trim().toLowerCase();
  
  // Try to find exact or partial match in pre-built database first
  for (const k of Object.keys(SAMPLE_TOPICS)) {
    if (norm.includes(k) || k.includes(norm)) {
      return SAMPLE_TOPICS[k];
    }
  }

  // Generate dynamic clinical-style guide
  return {
    topic: topic ? `Educational Guide: ${topic}` : 'Cardiology Topic Explainer',
    definition: `A comprehensive medical summary of ${topic || 'the selected cardiorespiratory topic'}, compiled for medical educational review.`,
    causes: [
      'Genetic predisposition and family history',
      'Chronic vascular sheer stress (Hypertension)',
      'Atherosclerotic burden or plaque accumulation',
      'Metabolic factors (Diabetes, Dyslipidemia)',
      'Sedentary lifestyle and dietary patterns'
    ],
    symptoms: [
      'Exertional fatigue or lowered physical endurance',
      'Atypical chest fullness or breathing resistance',
      'Mild palpitations during elevated sinus heart rate',
      'Transient lightheadedness'
    ],
    diagnosis: [
      'Comprehensive Patient History & Risk Factor Auditing',
      'Primary Electrocardiography (ECG) to monitor pacing and conduction pathways',
      'Echocardiographic Imaging to evaluate cardiac valves and muscular ejection',
      'Specific Serum Biomarkers (such as Troponins, BNP, or Lipid Panels)'
    ],
    management: [
      'Lifestyle modifications including low-sodium, heart-healthy diets (DASH diet) and structured physical exercise.',
      'Pharmacological therapy targeting underlying factors (e.g., beta-blockers for heart rate control, ACE inhibitors for remodeling protection).',
      'Regular follow-up appointments with serial ECGs or Echo scans to assess progression.'
    ],
    mnemonics: [
      {
        phrase: 'HEART (General Cardiology Study Guide)',
        expansion: [
          { key: 'H', text: 'History - thorough review of patient background' },
          { key: 'E', text: 'ECG - first-line assessment of cardiac electrical flow' },
          { key: 'A', text: 'Age - risk factor threshold consideration' },
          { key: 'R', text: 'Risk Factors - HTN, DM, smoking, family history' },
          { key: 'T', text: 'Troponins - assessment of cell integrity and injury' }
        ]
      }
    ]
  };
}

export function generateCustomMCQs(topic: string): MCQQuestion[] {
  const cleanedTopic = topic ? topic.trim() : 'General Cardiology';
  
  return [
    {
      id: `q_cust_1`,
      question: `Which is the first-line diagnostic modality to evaluate suspected structural changes related to ${cleanedTopic}?`,
      options: [
        'Electrocardiography (ECG)',
        'Transthoracic Echocardiogram (TTE)',
        'Cardiac Magnetic Resonance Imaging (MRI)',
        'Myocardial Perfusion Scintigraphy'
      ],
      correctIndex: 1,
      explanation: 'Echocardiography (TTE) is the most readily available, highly reliable, and cost-effective initial diagnostic test to evaluate cardiac structures, chamber sizes, and valvular functionality.'
    },
    {
      id: `q_cust_2`,
      question: `Which of the following represents a key physiological marker directly associated with ${cleanedTopic} clinical progression?`,
      options: [
        'Serum Alanine Aminotransferase',
        'Serum Creatinine Kinase-MB or Troponin levels',
        'C-reactive protein (CRP)',
        'Arterial Blood Gas pH'
      ],
      correctIndex: 1,
      explanation: 'Cardiac troponins and CK-MB are the highly specific gold standard biochemical markers used to diagnose acute myocardial injury and monitor vascular events.'
    },
    {
      id: `q_cust_3`,
      question: `In clinical cardiology education, what is the initial primary therapeutic target when managing patient symptoms related to ${cleanedTopic}?`,
      options: [
        'Immediate surgical bypass surgery',
        'Addressing underlying modifiable risk factors (HTN, lipids, smoking) and symptom relief',
        'Prophylactic whole-body anticoagulation',
        'Strict absolute bed rest for 4 weeks'
      ],
      correctIndex: 1,
      explanation: 'In the absence of emergency red flags, chronic cardiological management begins by modifying risk factors (controlling blood pressure, statin therapy, smoking cessation) alongside medical symptom control.'
    },
    {
      id: `q_cust_4`,
      question: `What role does a high-sodium diet play in aggravating cardiac conditions such as ${cleanedTopic}?`,
      options: [
        'It directly blocks coronary artery blood flow',
        'It causes fluid retention, increasing blood volume and cardiac preload',
        'It speeds up hepatic clearance of cardiovascular drugs',
        'It induces cardiac muscle atrophy'
      ],
      correctIndex: 1,
      explanation: 'Excess sodium promotes renal water retention, which expands intravascular volume, increases venous return (preload), raises blood pressure, and places extra workload on the ventricles.'
    },
    {
      id: `q_cust_5`,
      question: `Which autonomic nervous system division is activated as a compensatory response when cardiac output falls?`,
      options: [
        'Parasympathetic Nervous System',
        'Sympathetic Nervous System',
        'Somatic Nervous System',
        'Enteric Nervous System'
      ],
      correctIndex: 1,
      explanation: 'The Sympathetic Nervous System is rapidly activated to compensate for decreased cardiac output, releasing catecholamines to increase heart rate, augment contractility, and cause vasoconstriction.'
    },
    {
      id: `q_cust_6`,
      question: `When explaining drug actions to a student, which class of agents acts by blocking the conversion of Angiotensin I to Angiotensin II?`,
      options: [
        'Beta-blockers',
        'ACE Inhibitors (ACEi)',
        'Calcium Channel Blockers (CCB)',
        'Aldosterone Antagonists'
      ],
      correctIndex: 1,
      explanation: 'Angiotensin-Converting Enzyme (ACE) Inhibitors directly block the enzyme responsible for converting inactive Angiotensin I to the potent vasoconstrictor and remodeling mediator Angiotensin II.'
    },
    {
      id: `q_cust_7`,
      question: `Which of the following is a key symptom of left-sided heart failure due to pulmonary venous congestion?`,
      options: [
        'Bilateral pitting ankle edema',
        'Paroxysmal Nocturnal Dyspnea (PND)',
        'Ascites and hepatomegaly',
        'Splenomegaly'
      ],
      correctIndex: 1,
      explanation: 'Left-sided heart failure causes pressure backup into the pulmonary circulation, leading to fluid leak into alveoli which manifests as exertional dyspnea, orthopnea, and Paroxysmal Nocturnal Dyspnea (PND).'
    },
    {
      id: `q_cust_8`,
      question: `What ECG wave corresponds to atrial depolarization?`,
      options: [
        'P-wave',
        'QRS complex',
        'T-wave',
        'U-wave'
      ],
      correctIndex: 0,
      explanation: 'The P-wave represents the wave of depolarization spreading from the sinoatrial (SA) node across both atria, preceding atrial contraction.'
    },
    {
      id: `q_cust_9`,
      question: `What ECG component represents the total time taken for ventricular depolarization and subsequent repolarization?`,
      options: [
        'PR Interval',
        'QRS duration',
        'QT Interval',
        'ST Segment'
      ],
      correctIndex: 2,
      explanation: 'The QT interval is measured from the beginning of the QRS complex to the end of the T-wave, representing the total duration of ventricular electrical systole.'
    },
    {
      id: `q_cust_10`,
      question: `Which valvular abnormality is classically associated with a high-pitched blowing diastolic murmur heard best at the left sternal border?`,
      options: [
        'Aortic Regurgitation',
        'Mitral Stenosis',
        'Aortic Stenosis',
        'Tricuspid Regurgitation'
      ],
      correctIndex: 0,
      explanation: 'Aortic Regurgitation classically presents with an early diastolic decrescendo murmur, high-pitched and blowing, heard best at the left sternal border with the patient sitting up and leaning forward.'
    }
  ];
}

export function generateCustomNotesSummary(notes: string): NotesSummary {
  const wordCount = notes ? notes.split(/\s+/).length : 0;
  
  return {
    title: 'Custom Lecture Notes Summary',
    summary: `Pristine medical summarization of pasted student lecture material (${wordCount} words analyzed). This document synthesizes key cardiovascular pathophysiological concepts and formats them for efficient board-level learning.`,
    keyPoints: [
      notes.length > 50 
        ? `Primary Concept: "${notes.substring(0, 100)}..." contains crucial cardiology definitions and clinical relationships.`
        : 'Ensure understanding of basic hemodynamics: Cardiac Output = Heart Rate × Stroke Volume.',
      'Pathophysiological integration: Cardiac dysfunction triggers compensatory responses (neurohormonal activation) which over time lead to myocardial remodeling.',
      'Valvular mechanics: Stenotic lesions lead to pressure overload (hypertrophy); regurgitant lesions lead to volume overload (eccentric dilation).'
    ],
    examTips: [
      'High Yield: Be prepared to state the difference between pressure overload and volume overload cardiac remodeling.',
      'Practice drawing the cardiac cycle (Wiggers diagram) to easily relate pressure, volume, ECG, and heart sounds.'
    ]
  };
}

export function generateCustomVivaQuestions(keywords: string): VivaQuestion[] {
  return [
    {
      id: 'v_cust_1',
      question: `Based on your interest, explain how clinical assessment can verify and characterize the pathophysiology of ${keywords || 'Cardiological Conditions'}?`,
      modelAnswer: `Clinical assessment relies on pairing a detailed history of the patient's symptoms (e.g., character, onset, timing of chest pain or dyspnea) with structured physical exams. Auscultation identifies heart sounds and regurgitant/stenotic murmurs. These findings guide targeted investigations like ECG for rhythm and depolarization abnormalities, and Echocardiography for structural and volumetric parameters.`,
      expectedKeywords: ['clinical', 'history', 'auscultation', 'ECG', 'investigations', 'pathophysiology']
    },
    {
      id: 'v_cust_2',
      question: 'Why is it critical for cardiology students to differentiate compensation from decompensation in acute cardiac failure?',
      modelAnswer: 'Compensation involves physiological pathways (like SNS and RAAS) trying to maintain adequate perfusion pressure. However, these increase cardiac workload. Decompensation occurs when these pathways overwhelm the myocardium, leading to pulmonary congestion and systemic hypoperfusion. Understanding this boundary dictates therapeutic intervention, such as when to utilize aggressive loop diuretics and vasodilators.',
      expectedKeywords: ['compensation', 'RAAS', 'SNS', 'workload', 'decompensation', 'diuretics']
    }
  ];
}
