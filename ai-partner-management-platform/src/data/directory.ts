import { reactive } from 'vue'

export type Tier = 'Registered' | 'Select' | 'Premier'
export type Region = 'Midwest' | 'South' | 'Coast' | 'West'
export type DealStatus = 'Open' | 'Waiting' | 'Filed'

export interface Partner {
  id: string
  firm: string
  tier: Tier
  region: Region
  lead: string
  since: string
  phone: string
  email: string
  score: number
  step: number
  activity: { id: string; title: string; description: string; time: string }[]
}

export interface Deal {
  id: string
  number: string
  partnerId: string
  name: string
  status: DealStatus
  filed: string
  amount: number
}

export const desk = reactive({
  defaultRegion: 'Midwest' as Region,
  cutoff: '17:00',
  premierDeals: 2,
  reviewOn: '2026-12-01',
  note: 'Premier partners get a named lead.',
  holdQuiet: true,
  pin: '',
  partners: [
    {
      id: 'pt-northwind',
      firm: 'Northwind Supply',
      tier: 'Premier',
      region: 'Midwest',
      lead: 'Asha Poluru',
      since: '2019',
      phone: '312-0140',
      email: 'asha.poluru@northwind.example',
      score: 5,
      step: 3,
      activity: [
        { id: 'a1', title: 'Agreement renewed', description: 'Winter terms filed.', time: 'Nov 2' },
        { id: 'a2', title: 'Training', description: 'Dock walk with the desk.', time: 'Oct 14' },
      ],
    },
    {
      id: 'pt-bright',
      firm: 'Bright Parcel',
      tier: 'Select',
      region: 'South',
      lead: 'Bala Poluru',
      since: '2021',
      phone: '214-0188',
      email: 'bala.poluru@bright.example',
      score: 4,
      step: 2,
      activity: [
        { id: 'b1', title: 'Portal access', description: 'Desk login opened.', time: 'Oct 20' },
        { id: 'b2', title: 'Agreement', description: 'Select terms signed.', time: 'Sep 3' },
      ],
    },
    {
      id: 'pt-harbor',
      firm: 'Harbor Mail',
      tier: 'Registered',
      region: 'Coast',
      lead: 'Chetan Poluru',
      since: '2024',
      phone: '415-0112',
      email: 'chetan.poluru@harbor.example',
      score: 3,
      step: 1,
      activity: [
        { id: 'c1', title: 'Agreement', description: 'Registered packet filed.', time: 'Nov 4' },
      ],
    },
    {
      id: 'pt-elm',
      firm: 'Elm Route',
      tier: 'Premier',
      region: 'West',
      lead: 'Divya Poluru',
      since: '2018',
      phone: '503-0166',
      email: 'divya.poluru@elm.example',
      score: 5,
      step: 3,
      activity: [
        { id: 'd1', title: 'West hubs', description: 'Waiting on the evening sort.', time: 'Sep 18' },
        { id: 'd2', title: 'Training', description: 'Named session in Portland.', time: 'Aug 9' },
      ],
    },
    {
      id: 'pt-paper',
      firm: 'Paper Dock',
      tier: 'Select',
      region: 'Midwest',
      lead: 'Ekta Poluru',
      since: '2023',
      phone: '312-0194',
      email: 'ekta.poluru@paper.example',
      score: 4,
      step: 0,
      activity: [
        { id: 'e1', title: 'Intro call', description: 'Select review still open.', time: 'Oct 2' },
      ],
    },
    {
      id: 'pt-cedar',
      firm: 'Cedar Freight',
      tier: 'Registered',
      region: 'South',
      lead: 'Faisal Poluru',
      since: '2022',
      phone: '214-0107',
      email: 'faisal.poluru@cedar.example',
      score: 4,
      step: 1,
      activity: [
        { id: 'f1', title: 'Agreement', description: 'South pickup terms filed.', time: 'Oct 28' },
      ],
    },
    {
      id: 'pt-lantern',
      firm: 'Lantern Post',
      tier: 'Premier',
      region: 'Coast',
      lead: 'Gitanjali Poluru',
      since: '2017',
      phone: '415-0175',
      email: 'gitanjali.poluru@lantern.example',
      score: 5,
      step: 3,
      activity: [
        { id: 'g1', title: 'Holiday surge', description: 'Waiting on a coast window.', time: 'Nov 1' },
        { id: 'g2', title: 'Training', description: 'Premier desk session.', time: 'Sep 22' },
      ],
    },
    {
      id: 'pt-west',
      firm: 'West Annex',
      tier: 'Select',
      region: 'West',
      lead: 'Harshil Poluru',
      since: '2025',
      phone: '503-0120',
      email: 'harshil.poluru@annex.example',
      score: 3,
      step: 2,
      activity: [
        { id: 'h1', title: 'Portal access', description: 'Annex desk login is live.', time: 'Oct 11' },
      ],
    },
  ] as Partner[],
  deals: [
    { id: 'dl-4410', number: 'AY-4410', partnerId: 'pt-northwind', name: 'Winter terms', status: 'Open', filed: '2026-11-02', amount: 48000 },
    { id: 'dl-4418', number: 'AY-4418', partnerId: 'pt-northwind', name: 'Winter lane', status: 'Waiting', filed: '2026-11-12', amount: 22000 },
    { id: 'dl-4422', number: 'AY-4422', partnerId: 'pt-bright', name: 'Sort room', status: 'Open', filed: '2026-10-20', amount: 15000 },
    { id: 'dl-4430', number: 'AY-4430', partnerId: 'pt-harbor', name: 'Coastal drop', status: 'Open', filed: '2026-11-04', amount: 9000 },
    { id: 'dl-4436', number: 'AY-4436', partnerId: 'pt-elm', name: 'West hubs', status: 'Waiting', filed: '2026-09-18', amount: 31000 },
    { id: 'dl-4441', number: 'AY-4441', partnerId: 'pt-elm', name: 'Evening sort', status: 'Open', filed: '2026-11-08', amount: 12000 },
    { id: 'dl-4402', number: 'AY-4402', partnerId: 'pt-paper', name: 'Spring filing', status: 'Filed', filed: '2026-04-02', amount: 4000 },
    { id: 'dl-4448', number: 'AY-4448', partnerId: 'pt-cedar', name: 'South pickup', status: 'Open', filed: '2026-10-28', amount: 7000 },
    { id: 'dl-4455', number: 'AY-4455', partnerId: 'pt-lantern', name: 'Coast premier', status: 'Open', filed: '2026-11-01', amount: 54000 },
    { id: 'dl-4460', number: 'AY-4460', partnerId: 'pt-lantern', name: 'Holiday surge', status: 'Waiting', filed: '2026-11-15', amount: 18000 },
    { id: 'dl-4466', number: 'AY-4466', partnerId: 'pt-west', name: 'Annex mail', status: 'Open', filed: '2026-10-11', amount: 11000 },
  ] as Deal[],
})

export function findPartner(id: string) {
  return desk.partners.find((partner) => partner.id === id)
}

export function partnerDeals(id: string) {
  return desk.deals.filter((deal) => deal.partnerId === id)
}

export function openDealCount(id: string) {
  return partnerDeals(id).filter((deal) => deal.status !== 'Filed').length
}
