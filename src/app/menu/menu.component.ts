import {Component, OnInit, OnDestroy} from '@angular/core';
import {MealService} from '../meal/meal.service';
import {Meal} from '../meal/meal';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { AFSService } from '../meal/afs.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

// Class for meal component
export class MenuComponent implements OnInit, OnDestroy {

  // Variable for Meal array
  meals;
  private subscription;

  // Configuration for ngx select dropdown menus used in html template
  // Config defines the name in the meals array and the default key
  // Config enables the search feature of ngx-select-dropdown
  config = {
    displayKey: 'name',
    search: true,
  };

  // Constructor for meal component
  constructor(private afsService: AFSService) {
  }
  // Call getMeals on component initialization
  ngOnInit() {
    this.getMeals();
  }

  // Method to get meals from array
  getMeals(): void {
    this.subscription = this.afsService.getMeals()
      .subscribe(meals => this.meals = meals);
  }

  // Method to capture the rendered menu html then create and download a pdf
  // Method uses html2canvas to capture the screen based on div 'print-screen'
  // Method then creates a PDF of the image using JSPDF
  captureScreen() {
    // Define variable for data for screen print method
    const printData = document.getElementById('print-section');
    html2canvas(printData, {type: 'view', foreignObjectRendering: 'true'}).then(function (canvas) {
      // Define variables for the screen capture
      // Image width variable equal to 200
      const imgWidth = 208;
      // Image height variable based on canvas
      const imgHeight = canvas.height * imgWidth / canvas.width;
      // URL variable for image set to image/png
      const contentDataURL = canvas.toDataURL('image/png');
      // PDF variable using jspdf and parameters for portrait, millimeters, and A4 orientation
      const pdf = new jspdf('p', 'mm', 'a4');
      // Position variable set to zero
      const position = 0;
      // Method to add image
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      // Use save method and save as WeeklyMealPlan.pdf
      pdf.save('WeeklyMealPlan.pdf');
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
