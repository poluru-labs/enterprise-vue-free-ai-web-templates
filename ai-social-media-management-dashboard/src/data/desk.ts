import { reactive } from 'vue'
import type { CHANNELS } from '@/constants/navigation'

export type Channel = (typeof CHANNELS)[number]
export type PostState = 'Draft' | 'Scheduled' | 'Posted'
export type Series = 'Bakery' | 'Park'

export interface Post {
  id: string
  title: string
  caption: string
  channel: Channel
  state: PostState
  day: string
  time: string
  owner: string
  series: Series
}

export interface ShelfFile {
  id: string
  name: string
  series: Series
  owner: string
  state: 'Approved' | 'Waiting'
}

export const WEEK = [
  { id: '2026-11-09', name: 'Mon', date: '9' },
  { id: '2026-11-10', name: 'Tue', date: '10' },
  { id: '2026-11-11', name: 'Wed', date: '11' },
  { id: '2026-11-12', name: 'Thu', date: '12' },
  { id: '2026-11-13', name: 'Fri', date: '13' },
  { id: '2026-11-14', name: 'Sat', date: '14' },
  { id: '2026-11-15', name: 'Sun', date: '15' },
] as const

export const desk = reactive({
  brand: 'Postwell',
  defaultChannel: 'Notes' as Channel,
  note: 'Captions stay short.',
  cutoff: '16:00',
  pin: '',
  holdDrafts: true,
  notify: 'publisher',
  posts: [
    { id: 'loaf', title: 'Monday loaf', caption: 'Rye and honey, out at seven.', channel: 'Notes', state: 'Scheduled', day: '2026-11-09', time: '07:00', owner: 'Tanvi Poluru', series: 'Bakery' },
    { id: 'lawn', title: 'East lawn', caption: 'The east lawn is open for the morning walk.', channel: 'Photos', state: 'Scheduled', day: '2026-11-09', time: '08:30', owner: 'Brinda Poluru', series: 'Park' },
    { id: 'rolls', title: 'Picnic rolls', caption: 'Park picnic rolls, still warm in the tin.', channel: 'Photos', state: 'Scheduled', day: '2026-11-10', time: '09:00', owner: 'Uday Poluru', series: 'Bakery' },
    { id: 'box', title: "This week's box", caption: 'Olive loaf, seed cracker, and jam.', channel: 'Mail', state: 'Scheduled', day: '2026-11-11', time: '11:00', owner: 'Vani Poluru', series: 'Bakery' },
    { id: 'shell', title: 'Band shell', caption: 'Band shell hours run from 4 to 7.', channel: 'Notes', state: 'Scheduled', day: '2026-11-11', time: '16:00', owner: 'Darsh Poluru', series: 'Park' },
    { id: 'bun', title: 'Friday bun', caption: 'One bun per person until noon.', channel: 'Notes', state: 'Scheduled', day: '2026-11-13', time: '08:00', owner: 'Yuvan Poluru', series: 'Bakery' },
    { id: 'notes', title: 'Park notes', caption: 'The week note goes to the block list.', channel: 'Mail', state: 'Draft', day: '2026-11-13', time: '15:00', owner: 'Eesha Poluru', series: 'Park' },
    { id: 'seed', title: 'Seed loaf', caption: 'A short note once the seed loaf is priced.', channel: 'Notes', state: 'Draft', day: '2026-11-11', time: '12:00', owner: 'Uday Poluru', series: 'Bakery' },
    { id: 'window', title: 'Window light', caption: 'Morning buns in the window light.', channel: 'Photos', state: 'Scheduled', day: '2026-11-14', time: '10:00', owner: 'Akarsh Poluru', series: 'Bakery' },
    { id: 'path', title: 'Leaf path', caption: 'The leaf path is swept through Sunday.', channel: 'Notes', state: 'Scheduled', day: '2026-11-14', time: '09:00', owner: 'Tanvi Poluru', series: 'Park' },
    { id: 'fountain', title: 'Fountain', caption: 'Fountain photo, waiting on the crop.', channel: 'Photos', state: 'Draft', day: '2026-11-14', time: '11:00', owner: 'Akarsh Poluru', series: 'Park' },
    { id: 'gates', title: 'Park run', caption: 'Gates open at eight.', channel: 'Photos', state: 'Scheduled', day: '2026-11-15', time: '08:00', owner: 'Brinda Poluru', series: 'Park' },
  ] as Post[],
  files: [
    { id: 'rye', name: 'rye-loaf.jpg', series: 'Bakery', owner: 'Tanvi Poluru', state: 'Approved' },
    { id: 'rolls-file', name: 'picnic-rolls.jpg', series: 'Bakery', owner: 'Uday Poluru', state: 'Approved' },
    { id: 'lawn-file', name: 'east-lawn.jpg', series: 'Park', owner: 'Brinda Poluru', state: 'Approved' },
    { id: 'window-file', name: 'window-buns.jpg', series: 'Bakery', owner: 'Akarsh Poluru', state: 'Approved' },
    { id: 'shell-file', name: 'band-shell.jpg', series: 'Park', owner: 'Darsh Poluru', state: 'Waiting' },
    { id: 'path-file', name: 'leaf-path.jpg', series: 'Park', owner: 'Tanvi Poluru', state: 'Approved' },
  ] as ShelfFile[],
})

export function postsOn(day: string, channel: string) {
  return desk.posts.filter((post) => {
    const dayOk = post.day === day && post.state !== 'Draft'
    const channelOk = channel === 'all' || post.channel === channel
    return dayOk && channelOk
  })
}

export function findPost(id: string) {
  return desk.posts.find((post) => post.id === id)
}
