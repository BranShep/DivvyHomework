import UIKit
import Charts

class MyChartView: UIView {
  var barChartView = BarChartView()
  @objc var xValues: [String] = []
  @objc var yValues: [Double] = []

  override public func layoutSubviews() {
    super.layoutSubviews()
    let frame = CGRect(x: 0, y: 0, width: self.frame.width, height: self.frame.height)
    barChartView.frame = frame

    self.initChart()
  }

  private func initChart() {
    var dataEntries: [BarChartDataEntry] = []

    for i in 0..<yValues.count {
      let dataEntry = BarChartDataEntry(x: Double(i), y: yValues[i])
      dataEntries.append(dataEntry)
    }

    let chartDataSet = BarChartDataSet(entries: dataEntries, label: "Revenue (Millions)")
    let chartData = BarChartData(dataSet: chartDataSet)
    barChartView.xAxis.valueFormatter = IndexAxisValueFormatter(values: xValues)
    chartDataSet.setColor(.green)
    barChartView.data = chartData
    
    let yAxis = barChartView.leftAxis
    let xAxis = barChartView.xAxis
    // yAxis.labelTextColor = .black
    // xAxis.labelTextColor = .systemGray
    

    barChartView.animate(xAxisDuration: 2.0, yAxisDuration: 2.0)
    self.addSubview(barChartView)
  }
}

