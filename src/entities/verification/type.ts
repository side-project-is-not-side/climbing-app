export type VerificationInfo = VerificationLocation | VeirficationPhoto;

export type VerificationLocation = {
  id: number;
  challengeName: string;
  gymName: string;
  gymAddress: string;
  createdAt: Date;
};

export type VeirficationPhoto = {id: number; challengeName: string; imageUrl: string; createdAt: Date};
