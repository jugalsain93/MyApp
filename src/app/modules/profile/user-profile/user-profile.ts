import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { UserProfileDetails } from '../../../models/user-profile-model';
import { DashboardService } from '../../../services/dashboard.service';
import { firstValueFrom } from 'rxjs';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css']
})
export class UserProfileComponent implements OnInit {

  objModel: UserProfileDetails = {} as UserProfileDetails;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private dashboardService: DashboardService,
    private loadingService: LoadingService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.GetUserDetails();
    this.loadingService.setContentLoading(false);
  }

  private async GetUserDetails(): Promise<void> {
    try {
      this.objModel = await firstValueFrom(this.userService.getUserProfile());
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }
}
