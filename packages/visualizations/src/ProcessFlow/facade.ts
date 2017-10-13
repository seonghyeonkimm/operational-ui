import AbstractFacade from "../utils/abstract_facade"
import Canvas from "./canvas"
import Series from "./series"
import Focus from "./focus"
import { uniqueId } from "lodash/fp"

class ProcessFlow extends AbstractFacade {
  series: Series
  canvas: Canvas

  defaultConfig(): any {
    return {
      data: {},
      config: {
        duration: 1e3,
        height: 1000,
        highlightColor: "#0000ff",
        labelOffset: 5,
        labelPadding: 5,
        linkStroke: "#aaa",
        maxLinkWidth: 8,
        maxNodeSize: 1500,
        minLinkWidth: 1,
        minNodeSize: 100,
        nodeBorderWidth: 10,
        showLinkFocusLabels: true,
        showNodeFocusLabels: true,
        uid: uniqueId(this.visualizationName()),
        visualizationName: this.visualizationName(),
        width: 500,
      },
      accessors: {
        data: {
          nodes: (d: any) => d.nodes,
          journeys: (d: any) => d.journeys
        }
      },
      computed: {
        series: {},
        canvas: {},
      },
    }
  }

  visualizationName(): string {
    return "processflow"
  }

  insertCanvas(): void {
    this.canvas = new Canvas(this.state.readOnly(), this.state.computedWriter(["canvas"]), this.events, this.context)
  }

  initializeComponents(): void {
    this.components = {
      focus: new Focus(
        this.state.readOnly(),
        this.state.computedWriter(["focus"]),
        this.events,
        this.canvas.elementFor("focus"),
      ),
    }
  }

  initializeSeries(): void {
    this.series = new Series(
      this.state.readOnly(),
      this.state.computedWriter(["series"]),
      this.events,
      this.canvas.elementFor("series"),
    )
  }

  draw(): Element {
    this.series.prepareData()
    this.canvas.draw()
    this.series.draw()
    this.drawn = true
    this.dirty = false
    return this.canvas.elementFor("series").node()
  }
}

export default ProcessFlow