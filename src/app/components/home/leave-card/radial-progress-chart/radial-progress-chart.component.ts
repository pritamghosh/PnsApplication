import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  Input,
} from "@angular/core";
import {
  D3Service,
  D3,
  Axis,
  BrushBehavior,
  BrushSelection,
  D3BrushEvent,
  ScaleLinear,
  ScaleOrdinal,
  Selection,
  Transition,
} from "d3-ng2-service";

@Component({
  selector: "app-radial-progress-chart",
  templateUrl: "./radial-progress-chart.component.html",
  styleUrls: ["./radial-progress-chart.component.scss"],
})
export class RadialProgressChartComponent implements OnInit {
  @Input() totalVal: any;
  @Input() resValue: any;
  @Input() progressColor: string;

  radiansToBeDrawn: number;
  private d3: D3;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;
  private parentNativeElement: any;
  constructor(
    private ngZone: NgZone,
    element: ElementRef,
    d3Service: D3Service
  ) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit(): void {
    this.radiansToBeDrawn = (this.resValue / this.totalVal) * 6.283185307179586;
    // console.log("RADIANS TO BE DRAWN" + this.radiansToBeDrawn)
    var r = 50;
    var totalRadians = Math.PI * 2;
    let d3 = this.d3;
    let canvas: any;
    let width: number = 100;
    let height: number = 100;
    let backGroundGroup: any;
    let progressGroup: any;
    let backGroundArc: any;
    let progressArc: any;
    if (this.parentNativeElement !== null) {
      canvas = d3
        .select(this.parentNativeElement)
        .append("svg") // create an <svg> element
        .attr("width", width) // set its dimensions
        .attr("height", height);
      backGroundGroup = canvas
        .append("g")
        .attr("transform", "translate(50,50)");
      backGroundArc = d3
        .arc()
        .startAngle(0)
        .endAngle(totalRadians)
        .innerRadius(r - 7.5)
        .outerRadius(r - 2.5);
      backGroundGroup
        .append("path")
        .attr("d", backGroundArc)
        .attr("fill", "lightgrey");
      progressGroup = canvas
        .append("g")
        .attr("transform", "translate(50,50)")
        .attr("fill", this.progressColor);
      progressArc = d3
        .arc()
        .startAngle(0)
        .endAngle(this.radiansToBeDrawn)
        .innerRadius(r - 10)
        .outerRadius(r);
      progressGroup.append("path").attr("d", progressArc);
      progressGroup
        .append("text")
        .attr("text-anchor", "middle")
        //  .attr("style", "fill:lightgrey; stroke-width: 5 ;")
        .attr("font-size", "14")
        .attr("font-weight", "700")
        .text(this.resValue + "/" + this.totalVal);
    }
  }
}
