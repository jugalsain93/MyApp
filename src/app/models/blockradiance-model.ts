
// Interfaces used in the component


export interface FilterDto {
  regionId: number;
  countryId: number;
  membershipId: string;
  partnerCompanyName: string;
  status: string;
  source: string;
  fromDate: Date | null;
  toDate: Date | null;
}
export interface PaginationDto {
  items: ViewMembershipDto[];
  totalCount: number;
  pageSize: number;
  pageNumber: number;
}

export interface MembershipRegisterDto {
  countryId: number;
  subscriptionId: number;
  companyId: number;
  durationUnit: string;
  duration: number;
  personalEmailId: string;
  subject: string;
  htmlBody: string;
}

export interface ViewMembershipDto {
  id: number;
  membershipId: string;
  companyName: string;
  duration: number;
  durationUnit: string;
  subscriptionType: string;
  source: string;
  membershipDate: string;
  membershipExpiryDate: string;
  transactionAmount: number;
  currency: string;
  referByMembershipId: string;
  status: string;
  personalEmailId: string;
}
