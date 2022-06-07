import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ContestsComponent } from './pages/contests/contests.component';
import { CompareComponent } from './pages/compare/compare.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TabViewModule } from 'primeng/tabview';

import { PanelMenuModule } from 'primeng/panelmenu';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { ContestTableComponent } from './components/contest-table/contest-table.component';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { MinuteSecondsPipe } from './pipes/minute-seconds.pipe';
import { HotToastModule } from '@ngneat/hot-toast';
import { CardModule } from 'primeng/card';
import { SubmissionStatsTableComponent } from './components/submission-stats-table/submission-stats-table.component';
import { ContestStatsTableComponent } from './components/contest-stats-table/contest-stats-table.component';
import { VerdictComponent } from './components/verdict/verdict.component';
import { LanguageComponent } from './components/language/language.component';
import { TagComponent } from './components/tag/tag.component';
import { RatingComponent } from './components/rating/rating.component';
import { LevelComponent } from './components/level/level.component';
import { ChartModule } from 'primeng/chart';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContestsComponent,
    CompareComponent,
    HeaderComponent,
    FooterComponent,
    ContestTableComponent,
    MinuteSecondsPipe,
    SubmissionStatsTableComponent,
    ContestStatsTableComponent,
    VerdictComponent,
    LanguageComponent,
    TagComponent,
    RatingComponent,
    LevelComponent,
    BarChartComponent,
    LineChartComponent,
    DoughnutChartComponent,
    PieChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    HotToastModule.forRoot(),
    FormsModule,
    HttpClientModule,
    TabViewModule,
    PanelMenuModule,
    TabMenuModule,
    TableModule,
    RatingModule,
    ToastModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    DropdownModule,
    ProgressBarModule,
    BrowserAnimationsModule,
    CardModule,
    ChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
