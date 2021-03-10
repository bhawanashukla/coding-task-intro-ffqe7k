import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-introduction",
  templateUrl: "./introduction.component.html",
  styleUrls: ["./introduction.component.css"]
})
export class IntroductionComponent implements OnInit {
  managerCount = 0;
  departmentObj: any = [];
  constructor() {}

  ngOnInit() {}
  createDepartment() {
    this.departmentObj.push({
      totalCost: 0,
      managerObj: []
    });
  }

  addManager(index: any) {
    this.managerCount++;
    this.departmentObj[index].managerObj.push({
      developerCount: 0,
      testerCount: 0,
      totalCost: 0,
      subManager: []
    });
    this.updateTotalCost(index);
  }

  addSubManager(deptIndex: any, managerIndex: any) {
    this.managerCount++;
    this.departmentObj[deptIndex].managerObj[managerIndex].subManager.push({
      developerCount: 0,
      testerCount: 0,
      totalCost: 0,
      subManager: []
    });

    this.updateTotalCost(deptIndex, managerIndex);
    console.log(this.departmentObj);
  }

  addDeveloper(deptIndex: any, managerIndex: any, subManagerIndex?: any) {
    if (subManagerIndex != undefined) {
      this.departmentObj[deptIndex].managerObj[managerIndex].subManager[
        subManagerIndex
      ].developerCount++;
    } else {
      this.departmentObj[deptIndex].managerObj[managerIndex].developerCount++;
    }
    this.updateTotalCost(deptIndex, managerIndex, subManagerIndex);
  }

  addTester(deptIndex: any, managerIndex: any, subManagerIndex?: any) {
    if (subManagerIndex != undefined) {
      this.departmentObj[deptIndex].managerObj[managerIndex].subManager[
        subManagerIndex
      ].testerCount++;
    } else {
      this.departmentObj[deptIndex].managerObj[managerIndex].testerCount++;
    }
    this.updateTotalCost(deptIndex, managerIndex, subManagerIndex);
  }

  updateTotalCost(deptIndex: any, managerIndex?: any, subManagerIndex?: any) {
    var tempTotalCost = 0;
    if (managerIndex != undefined) {
      //when developer and testers are added then need update manager & department cost
      if (subManagerIndex != undefined) {
        console.log(deptIndex + managerIndex + subManagerIndex);
        this.departmentObj[deptIndex].managerObj[managerIndex].subManager[
          subManagerIndex
        ].totalCost =
          this.departmentObj[deptIndex].managerObj[managerIndex].subManager[
            subManagerIndex
          ].developerCount *
            1000 +
          this.departmentObj[deptIndex].managerObj[managerIndex].subManager[
            subManagerIndex
          ].testerCount *
            500 +
          this.departmentObj[deptIndex].managerObj[managerIndex].subManager[
            subManagerIndex
          ].subManager.length *
            300;

        //all manager's cost are being updated
        this.departmentObj[deptIndex].managerObj.forEach(value => {
          var temSubManCost = 0;
          value.subManager.forEach(val => {
            temSubManCost = temSubManCost + val.totalCost;
          });
          console.log(
            value.totalCost + " " + temSubManCost + " " + tempTotalCost
          );
          value.totalCost = temSubManCost + value.subManager.length * 300;
          tempTotalCost = value.totalCost;
        });
      } else {
        this.departmentObj[deptIndex].managerObj[managerIndex].totalCost =
          this.departmentObj[deptIndex].managerObj[managerIndex]
            .developerCount *
            1000 +
          this.departmentObj[deptIndex].managerObj[managerIndex].testerCount *
            500 +
          this.departmentObj[deptIndex].managerObj[managerIndex].subManager
            .length *
            300;

        //all manager's cost are being updated
        this.departmentObj[deptIndex].managerObj.forEach(value => {
          tempTotalCost = tempTotalCost + value.totalCost;
        });
      }

      //all department's cost being updated
      this.departmentObj[deptIndex].totalCost =
        tempTotalCost + this.departmentObj[deptIndex].managerObj.length * 300;
    } else {
      //when manager is added then only need to update department cost
      this.departmentObj[deptIndex].totalCost =
        this.departmentObj[deptIndex].totalCost + 300;
    }
    console.log(this.departmentObj);
  }
}
