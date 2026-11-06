import { reactive } from 'vue'

export type Category = 'Travel' | 'Software' | 'Meals'
export type ClaimStatus = 'Waiting' | 'Approved' | 'Sent back'

export interface ClaimLine {
  id: string
  label: string
  amount: number
}

export interface Claim {
  id: string
  number: string
  title: string
  owner: string
  reviewer: string
  category: Category
  vendor: string
  amount: number
  status: ClaimStatus
  submitted: string
  notes: string
  receipt: string
  lines: ClaimLine[]
}

export interface Vendor {
  id: string
  name: string
  category: Category
  contact: string
  note: string
}

export const REVIEWER = 'Farah Poluru'

export const desk = reactive({
  threshold: 400,
  currency: 'USD',
  digest: 'weekday',
  cadence: 'daily',
  quietHours: false,
  pager: true,
  digestTime: '09:00',
  pin: '',
  claims: [
    {
      id: 'cl-1042',
      number: 'CL-1042',
      title: 'Austin flight',
      owner: 'Arjun Poluru',
      reviewer: REVIEWER,
      category: 'Travel',
      vendor: 'Northwind Travel',
      amount: 486,
      status: 'Waiting',
      submitted: '2026-11-04',
      notes: 'Out and back for the customer workshop.',
      receipt: 'NW-8841',
      lines: [
        { id: 'l1', label: 'Airfare', amount: 440 },
        { id: 'l2', label: 'Checked bag', amount: 46 },
      ],
    },
    {
      id: 'cl-1048',
      number: 'CL-1048',
      title: 'Design seat',
      owner: 'Bina Poluru',
      reviewer: REVIEWER,
      category: 'Software',
      vendor: 'Deskware',
      amount: 144,
      status: 'Waiting',
      submitted: '2026-11-04',
      notes: 'One month on the shared design seat.',
      receipt: 'DW-220',
      lines: [{ id: 'l1', label: 'Seat', amount: 144 }],
    },
    {
      id: 'cl-1051',
      number: 'CL-1051',
      title: 'Client lunch',
      owner: 'Charan Poluru',
      reviewer: REVIEWER,
      category: 'Meals',
      vendor: 'Harbor Table',
      amount: 86,
      status: 'Waiting',
      submitted: '2026-11-05',
      notes: 'Lunch with the Austin workshop guests.',
      receipt: 'HT-19',
      lines: [
        { id: 'l1', label: 'Lunch', amount: 72 },
        { id: 'l2', label: 'Tip', amount: 14 },
      ],
    },
    {
      id: 'cl-1055',
      number: 'CL-1055',
      title: 'Denver hotel',
      owner: 'Diya Poluru',
      reviewer: REVIEWER,
      category: 'Travel',
      vendor: 'Northwind Travel',
      amount: 312,
      status: 'Waiting',
      submitted: '2026-11-05',
      notes: 'Two nights near the office.',
      receipt: 'NW-8902',
      lines: [
        { id: 'l1', label: 'Room', amount: 280 },
        { id: 'l2', label: 'Tax', amount: 32 },
      ],
    },
    {
      id: 'cl-1058',
      number: 'CL-1058',
      title: 'Airport taxi',
      owner: 'Eshan Poluru',
      reviewer: REVIEWER,
      category: 'Travel',
      vendor: 'Northwind Travel',
      amount: 54,
      status: 'Waiting',
      submitted: '2026-11-05',
      notes: 'Taxi from the airport to the hotel.',
      receipt: 'NW-8910',
      lines: [{ id: 'l1', label: 'Taxi', amount: 54 }],
    },
    {
      id: 'cl-1020',
      number: 'CL-1020',
      title: 'Team dinner',
      owner: REVIEWER,
      reviewer: 'Gopal Poluru',
      category: 'Meals',
      vendor: 'Harbor Table',
      amount: 64,
      status: 'Waiting',
      submitted: '2026-11-02',
      notes: 'Dinner after the planning meeting.',
      receipt: 'HT-11',
      lines: [{ id: 'l1', label: 'Dinner', amount: 64 }],
    },
    {
      id: 'cl-1028',
      number: 'CL-1028',
      title: 'Editor license',
      owner: REVIEWER,
      reviewer: 'Gopal Poluru',
      category: 'Software',
      vendor: 'Deskware',
      amount: 96,
      status: 'Approved',
      submitted: '2026-11-01',
      notes: 'Yearly editor license.',
      receipt: 'DW-198',
      lines: [{ id: 'l1', label: 'License', amount: 96 }],
    },
    {
      id: 'cl-1012',
      number: 'CL-1012',
      title: 'Dallas train',
      owner: 'Gopal Poluru',
      reviewer: REVIEWER,
      category: 'Travel',
      vendor: 'Northwind Travel',
      amount: 128,
      status: 'Approved',
      submitted: '2026-10-28',
      notes: 'Day trip for the vendor review.',
      receipt: 'NW-8704',
      lines: [{ id: 'l1', label: 'Train', amount: 128 }],
    },
    {
      id: 'cl-1016',
      number: 'CL-1016',
      title: 'Office coffee',
      owner: 'Hina Poluru',
      reviewer: REVIEWER,
      category: 'Meals',
      vendor: 'Harbor Table',
      amount: 36,
      status: 'Sent back',
      submitted: '2026-10-27',
      notes: 'Missing the attendee list.',
      receipt: 'HT-04',
      lines: [{ id: 'l1', label: 'Coffee', amount: 36 }],
    },
  ] as Claim[],
  vendors: [
    {
      id: 'northwind',
      name: 'Northwind Travel',
      category: 'Travel',
      contact: 'Gopal Poluru',
      note: 'Flights, hotels, and ground rides.',
    },
    {
      id: 'deskware',
      name: 'Deskware',
      category: 'Software',
      contact: 'Hina Poluru',
      note: 'Seats and editor licenses.',
    },
    {
      id: 'harbor',
      name: 'Harbor Table',
      category: 'Meals',
      contact: 'Bina Poluru',
      note: 'Client meals and team dinners.',
    },
  ] as Vendor[],
})

export function money(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}
