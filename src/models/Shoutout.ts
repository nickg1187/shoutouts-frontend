export default interface Shoutout {
  _id?: string;
  to: string;
  from: string;
  text: string;
  authorPhoto?: string;
  shoutoutPhoto?: string;
}
