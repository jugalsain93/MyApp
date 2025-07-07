// src/app/features/dashboard/pages/dashboard-home/dashboard-home.ts
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { ddlValues, filterValues } from '../../models/common-use-model';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { UserService } from '../../services/user.service';
import { UserProfileDetails } from '../../models/user-profile-model';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css'
})
export class DashboardHome implements OnInit {
  //isAuthenticated = false;
  dashboardItems: ddlValues[] = [];
  regionList: ddlValues[] = [];
  countryList: ddlValues[] = [];
  genderList: ddlValues[] = [];
  ageGroupList: ddlValues[] = [];
  objUser: UserProfileDetails = {} as UserProfileDetails;
  objFilter: filterValues = {
    regionId: 0,
    countryId: 0,
    membershipStatus: 'A',
    membershipType: '',
    gender: '',
    ageGroupId: 0,
    fromDate: '',
    toDate: ''
  };


  constructor(private commonService: CommonService, private router: Router,
    private dashboardService: DashboardService, private userService: UserService,
    private loadingService: LoadingService, private cdr: ChangeDetectorRef) { }

  async ngOnInit() {
    await this.initFilters();

    this.loadingService.setFullPageLoading(false);
    this.loadingService.setContentLoading(false);
  }

  async initFilters() {
    // const profile = await this.dashboardService.getUserProfile().toPromise();
    this.objUser = await firstValueFrom(this.userService.getUserProfile());
    this.objFilter.regionId = this.objUser.regionId;
    this.objFilter.countryId = this.objUser.countryId;
    this.regionList = await firstValueFrom(this.commonService.getRegions());
    this.countryList = await firstValueFrom(this.commonService.getCountries(this.objUser.regionId));
    this.genderList = await firstValueFrom(this.commonService.getGenders());
    this.ageGroupList = await firstValueFrom(this.commonService.getAgeGroups());
    this.onSearch();
  }

  async onSearch() {
    debugger;
    const f = this.objFilter;
    const filterString = `${f.regionId},${f.countryId},${f.membershipStatus},${f.membershipType},${f.ageGroupId},${f.gender},${f.fromDate || 0},${f.toDate || 0}`;
    // this.dashboardService.getDashboardData(filterString).subscribe(data => this.dashboardItems = data);

    this.dashboardItems = await firstValueFrom(this.dashboardService.getDashboardData(filterString));
    this.cdr.detectChanges();
    // alert('Data:\n' + JSON.stringify(this.dashboardItems, null, 2));
  }

  onRegionChange(event: any) {
    const selectedRegionId = +event.target.value;
    this.objFilter.regionId = selectedRegionId;

    this.commonService.getCountries(selectedRegionId).subscribe(data => {
      this.countryList = data ?? [];
      this.objFilter.countryId = 0; // reset selected country
    });
  }

}


