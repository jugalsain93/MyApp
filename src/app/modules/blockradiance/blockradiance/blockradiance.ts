import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlockRadianceService } from '../../../services/blockradiance.service';
import { ViewMembershipDto, FilterDto,PaginationDto } from '../../../models/blockradiance-model';
import { ViewUserProfile, KeyValue, ddlValues, HtmlEmailTemplateDto } from '../../../models/common-use-model';
import { CommonService } from '../../../services/common.service';
import { LoadingService } from '../../../core/services/loading.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-blockradiance',
  templateUrl: './blockradiance.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class BlockRadianceComponent implements OnInit {
  form: FormGroup;
  filterForm: FormGroup;
  countryList: ddlValues[] = [];
  regionKeyValues: ddlValues[] = [];
  subscriptionList: KeyValue[] = [];
  partnerList: KeyValue[] = [];
  emailTemplate!: HtmlEmailTemplateDto;
  profile!: ViewUserProfile;

  mode: 'list' | 'new' | 'view' = 'list';
  PaginationDto! : PaginationDto;
  listItem: ViewMembershipDto[] = [];
  selectedId: number | null = null;
  selectedDetails: ViewMembershipDto | null = null;

  constructor(
    private fb: FormBuilder,
    private blockRadianceService: BlockRadianceService,
    private commonService: CommonService,
    private loadingService: LoadingService
  ) {
    this.form = this.fb.group({
      countryId: [0, Validators.required],
      subscriptionId: [null, Validators.required],
      companyId: [null, Validators.required],
      durationUnit: [{ value: '', disabled: true }],
      duration: [{ value: 0, disabled: true }],
      personalEmailId: ['', Validators.required],
      subject: ['', Validators.required],
      htmlBody: ['', Validators.required]
    });

    this.filterForm = this.fb.group({
      regionId: [0],
      countryId: [0],
      membershipId: [''],
      partnerCompanyName: [''],
      status: [''],
      source: [''],
      fromDate: [null],
      toDate: [null]
    });
  }

  ngOnInit(): void {
    this.init();
  }


  async init() {
    try {// Get profile first
      this.profile = await firstValueFrom(this.commonService.getUserProfile());

      // Set default filter values based on profile
      this.filterForm.patchValue({
        regionId: this.profile.regionId,
        countryId: this.profile.countryId
      });

      // Fetch region list
      this.regionKeyValues = await firstValueFrom(this.commonService.getRegions());

      // Conditionally load countries if userLevelId > 1
      if (this.profile.userLevelId > 1 && this.profile.regionId) {
        this.countryList = await firstValueFrom(this.commonService.getCountries(this.profile.regionId));
      } else {
        // Otherwise load all countries
        this.countryList = await firstValueFrom(this.commonService.getCountriesAll());
      }

      // Load partners and email template
      this.partnerList = await firstValueFrom(this.blockRadianceService.getTicketingPartners());

      this.emailTemplate = await firstValueFrom(this.commonService.getEmailTemplate('Membership-Registration'));
      this.form.patchValue({ subject: this.emailTemplate.subject, htmlBody: this.emailTemplate.body });
     await this.loadList('N');
    } catch (error) {
      console.error('Initialization failed:', error);
    } finally {
      this.loadingService.setContentLoading(false);
    }
  }

  async onFilterSubmit(): Promise<void> {
    await this.loadList();
  }

  onRegionChange(): void {
    const regionId = +this.filterForm.value.regionId;
    if (regionId) {
      // Optional: fetch filtered countries
    }
  }

  async onCountryChange(event: any): Promise<void> {
    const countryId = +event.target.value;
    this.subscriptionList = await firstValueFrom(this.commonService.getSubscriptions(countryId));
  }

  onSubscriptionChange(event: any): void {
    const id = +event.target.value;
    const sub = this.subscriptionList.find(s => s.id === id);
    if (sub) {
      this.form.patchValue({
        subscriptionId: id,
        durationUnit: sub.durationUnit,
        duration: sub.duration
      });
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    const model = this.form.getRawValue();

    if ((model.durationUnit === 'M' && (model.duration < 1 || model.duration > 36)) ||
      (model.durationUnit === 'Y' && (model.duration < 1 || model.duration > 3))) {
      alert('Invalid duration value.');
      return;
    }

    const res = await firstValueFrom(this.blockRadianceService.submitMembership(model));
    if (res.statusCode === 200) {
      this.form.patchValue({ personalEmailId: '' });
      alert('Success: ' + res.message);
      this.mode = 'list';
      await this.loadList();
    } else {
      alert('Error: ' + res.message);
    }
  }

  async setMode(mode: 'list' | 'new' | 'view', id?: number): Promise<void> {
    this.mode = mode;
    if (mode === 'view' && id) {
      this.selectedDetails = await firstValueFrom(this.blockRadianceService.getMembershipDetails(id));
    }
  }

  async loadList(mode: 'N' | 'F' = 'N'): Promise<void> {
    let filter = '';
    let pageNumber =0;
    let pageSize = 50;
    if (mode === 'F') {
      filter = this.buildFilter();
    } else {
      filter = 'N'; // update this as per your default backend expectation
    }
   this.PaginationDto  = await firstValueFrom(this.blockRadianceService.getMembershipList(filter, pageNumber, pageSize));
    
   this.listItem = this.PaginationDto.items;
    alert('Data:\n' + JSON.stringify(this.PaginationDto, null, 2));
   
   
  }


  buildFilter(): string {
    const f = this.filterForm.value;
    if (f.fromDate && f.toDate) {
      return `${f.regionId},${f.countryId},${f.membershipId},${f.partnerCompanyName},${f.status},${f.source},${this.convertDate(f.fromDate)},${this.convertDate(f.toDate)}`;
    } else {
      return `${f.regionId},${f.countryId},${f.membershipId},${f.partnerCompanyName},${f.status},${f.source},0,0`;
    }
  }

  convertDate(date: string | Date): string {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  }

  async DownloadExcelFile(): Promise<void> {
    const filter = this.buildFilter();
    const blob = await firstValueFrom(this.blockRadianceService.downloadMembershipExcel(filter));
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Membership_List.xlsx';
    link.click();
  }

}
