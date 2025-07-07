// src/app/features/dashboard/models/dashboard.model.ts
export interface ddlValues {
  id: string;
  name: string;
}

export interface HttpResponse {
  statusCode: number;
  message: string;
}


export interface filterValues {
  regionId: number;
  countryId: number;
  membershipStatus: string;
  membershipType: string;
  gender: string;
  ageGroupId: number;
  fromDate?: string;
  toDate?: string;
}

export interface KeyValue {
  id: number;
  name: string;
  duration?: number;
  durationUnit?: string;
}

export interface ViewUserProfile {
  countryId: number;
  countryName?: string;
  userLevelId: number;
  regionName: string;
  regionId :number;
}

export interface HtmlEmailTemplateDto {
  subject: string;
  body: string;
}


