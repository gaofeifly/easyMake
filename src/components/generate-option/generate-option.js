import echarts from 'echarts/lib/echarts'
import ecStat from 'echarts-stat'

function generateOptionBar(setting,data,highSetting,saveFlag = 0){
  var series = []
  for(var i=0;i<setting.seriesName.length;i++){
    series.push({
      name: setting.seriesName[i],
      data: data.yData[i],
      type: 'bar',
      barMaxWidth: 50,
      label: highSetting.labelSetting,
      itemStyle: {
        color: highSetting.barSetting.barColor.length == 0 ? '' : highSetting.barSetting.barColor[i]
      },
      stack: highSetting.stackFlag ? 'stack' : null
    })
    if(highSetting.lineSeriesFlag){
      series.push({
        type: 'line',
        data: data.yData[i],
        itemStyle: {
          color: highSetting.barSetting.barColor.length == 0 ? '' : highSetting.barSetting.barColor[i]
        },
        stack: highSetting.stackFlag ? 'stack' : null
      })
    }
  }
  var xAxis = {
    name: setting.xName,
    type: 'category',
    data: data.xData,
    boundaryGap: true,
    axisTick: {
      show: highSetting.xAxisTickFlag
    }
  }
  var yAxis = {
    show: highSetting.yAxisFlag,
    name: setting.yName,
    type: 'value',
    splitLine: {
      show: highSetting.splitLineFlag,
    }
  }
  var option = {
    title: {
      text: setting.title,
      left: setting.titleX + '%',
      top: setting.titleY + '%',
      subtext: setting.subTitle,
      sublink: setting.titleLink,
      textStyle: {
        color: setting.titleColor,
        fontWeight: 'bold'
      },
      subtextStyle: {
        color: setting.titleColor
      },
    },
    legend: {
      top: setting.legendY + '%',
      left: setting.legendX + '%',
      show: setting.legendFlag,
      orient: setting.legendDir == 0 ? 'horizontal' : 'vertical'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: highSetting.transverseFlag ? yAxis : xAxis,
    yAxis: highSetting.transverseFlag ? xAxis : yAxis,
    grid: {
      top: '50',
      bottom: '50',
      left: '50',
      right: '50'
    },
    toolbox: {
      show: true,
      top: 30,
      right: 20,
      feature: saveFlag == 1 ? {} : {
        saveAsImage: {}
      }
    },
    series: series
  }
  if(setting.backColorFlag){
    echarts.registerTheme('backColor' + setting.backColor,{
      backgroundColor: setting.backColor
    })
  }
  return {
    option: option,
    backColorFlag: setting.backColorFlag,
    backColor: setting.backColor,
    themeIndex: setting.themeIndex,
  }
}
function generateOptionLine(setting,data,highSetting,saveFlag = 0){
  var series = []
  for(var i=0;i<setting.seriesName.length;i++){
    series.push({
      name: setting.seriesName[i],
      data: data.yData[i],
      type: 'line',
      symbol: highSetting.symbol,
      symbolSize: highSetting.symbolSize,
      stack: highSetting.stackFlag ? 'stack' : '',
      label: highSetting.labelSetting,
      lineStyle: {
        color: highSetting.lineColor[i],
        type: highSetting.lineType
      },
      areaStyle: highSetting.lineAreaFlag ? {
        color: highSetting.lineColor[i]
      } : null,
      smooth: highSetting.lineSmoothFlag,
      markPoint: highSetting.mostLeastFlag ? {
        data: [
          {type: 'max', name: '最大值'},
          {type: 'min', name: '最小值'}
        ]
      } : null
    })
  }
  var option = {
    title: {
      text: setting.title,
      left: setting.titleX + '%',
      top: setting.titleY + '%',
      subtext: setting.subTitle,
      sublink: setting.titleLink,
      textStyle: {
        color: setting.titleColor,
        fontWeight: 'bold'
      },
      subtextStyle: {
        color: setting.titleColor
      },
    },
    legend: {
      top: setting.legendY + '%',
      left: setting.legendX + '%',
      show: setting.legendFlag,
      orient: setting.legendDir == 0 ? 'horizontal' : 'vertical'
    },
    xAxis: {
      name: setting.xName,
      type: 'category',
      data: data.xData,
      boundaryGap: false,
      axisTick: {
        show: highSetting.xAxisTickFlag
      }
    },
    yAxis: {
      name: setting.yName,
      type: 'value',
      splitLine: {
        show: highSetting.splitLineFlag
      }
    },
    grid: {
      top: '50',
      bottom: '50',
      left: '50',
      right: '50'
    },
    tooltip: {
      trigger: 'axis'
    },
    toolbox: {
      show: true,
      top: 30,
      right: 20,
      feature: saveFlag == 1 ? {} : {
        saveAsImage: {}
      }
    },
    series: series
  }
  if(setting.backColorFlag){
    echarts.registerTheme('backColor' + setting.backColor,{
      backgroundColor: setting.backColor
    })
  }
  return {
    option: option,
    backColorFlag: setting.backColorFlag,
    backColor: setting.backColor,
    themeIndex: setting.themeIndex,
  } 
}
function generateOptionPie(setting,data,highSetting,saveFlag = 0){
  
  function searchRich(data){
    var richs = highSetting.richs
    for(var m=0;m<richs.length;m++){
      var rich = richs[m]
      if(rich.richSeriesIndex == data.i && rich.richSeriesTdNum == data.j+1){
        return rich
      }
    }
    return false
  }

  var series = []
  var seriesData = []
  var sector = highSetting.sector
  for(var i=0;i<data.xData.length;i++){
    var arr = []
    for(var j=0;j<data.xData[i].length;j++){
      var rich = searchRich({i,j})
      if(highSetting.richFlag && rich){
        arr.push({
          name: data.xData[i][j],
          value: data.yData[i][j],
          label: {
            show: highSetting.dataLabelShow,
            normal: {
              formatter: rich.labelFormatter,
              backgroundColor: '#eee',
              borderColor: '#777',
              borderWidth: 1,
              borderRadius: 4,
              rich: rich.richObj
            }
          }
        })
      }else{
        arr.push({
          name: data.xData[i][j],
          value: data.yData[i][j],
          label: {
            show: highSetting.dataLabelShow,
            fontSize: highSetting.labelFontSize,
            position: highSetting.labelPosition
          }
        })
      }
    }
    seriesData.push(arr)
  }
  var radius = []
  var center = []
  var sizeArr = [65,45,35,30,25]
  // 根据饼图不同个数设置不同的半径和位置分布
  switch(Number(setting.seriesName.length)){
    case 1:
      var r = sizeArr[0]*Number(sector.areaScale)
      radius = sector.ring ? [(r-20)+'%',r+'%'] : [0,r+'%']
      center = [['50%','50%']]
      break
    case 2:
      var r = sizeArr[1]*Number(sector.areaScale)
      radius = sector.ring ? [(r-20)+'%',r+'%'] : [0,r+'%']
      center = [['20%','50%'],['70%','50%']]
      break
    case 3:
      var r = sizeArr[2]*Number(sector.areaScale)
      radius = sector.ring ? [(r-20)+'%',r+'%'] : [0,r+'%']
      center = [['20%','30%'],['50%','70%'],['70%','30%']]
      break
    case 4:
      var r = sizeArr[3]*Number(sector.areaScale)
      radius = sector.ring ? [(r-20)+'%',r+'%'] : [0,r+'%']
      center = [['20%','20%'],['60%','20%'],['20%','70%'],['60%','70%']]
      break
    case 5:
      var r = sizeArr[4]*Number(sector.areaScale)
      radius = sector.ring ? [(r-20)+'%',r+'%'] : [0,r+'%']
      center = [['30%','20%'],['65%','20%'],['20%','70%'],['50%','70%'],['70%','70%']]
      break
  }
  function getTexture(index){
    for(var i=0;i<sector.texture.length;i++){
      if(sector.texture[i].seriesIndex == index){
        var img = new Image()
        img.src = sector.texture[i].img
        return {
          normal: {
            color: {
              image: img,
              repeat: 'repeat'
            }
          }
        }
      }
    }
    return false
  }
  for(var i=0;i<setting.seriesName.length;i++){
    series.push({
      name: setting.seriesName[i],
      data: seriesData[i],
      type: 'pie',
      radius: radius,
      center: center[i],
      startAngle: sector.rotateDeg,
      roseType: sector.roseType,
      itemStyle: sector.textureFlag ? getTexture(i) : {},
      labelLine: {
        show: highSetting.dataLabelShow
      }
    })
  }
  var option = {
    title: {
      text: setting.title,
      left: setting.titleX + '%',
      top: setting.titleY + '%',
      subtext: setting.subTitle,
      sublink: setting.titleLink,
      textStyle: {
        color: setting.titleColor,
        fontWeight: 'bold'
      },
      subtextStyle: {
        color: setting.titleColor
      },
    },
    legend: {
      top: setting.legendY + '%',
      left: setting.legendX + '%',
      show: setting.legendFlag,
      orient: setting.legendDir == 0 ? 'horizontal' : 'vertical'
    },
    grid: {
      top: '50',
      bottom: '50',
      left: '50',
      right: '50'
    },
    toolbox: {
      show: true,
      top: 30,
      right: 20,
      feature: saveFlag == 1 ? {} : {
        saveAsImage: {}
      }
    },
    tooltip: {
      formatter: '{a},{b}<br />{c},{d}%'
    },
    series: series
  }
  if(setting.backColorFlag){
    echarts.registerTheme('backColor' + setting.backColor,{
      backgroundColor: setting.backColor
    })
  }
  return {
    option: option,
    backColorFlag: setting.backColorFlag,
    backColor: setting.backColor,
    themeIndex: setting.themeIndex,
  }
}
function generateOptionScatter(setting,data,highSetting,saveFlag = 0){
  var series = []
  if(data.xData.length == setting.seriesName.length){
    for(var i=0;i<setting.seriesName.length;i++){
      var arr = []
      var total = 0
      for(var j=0;j<data.xData[i].length;j++){
        arr.push([ data.xData[i][j],data.yData[i][j],data.seriesData[i][j] ])
        total += Number(data.seriesData[i][j])
      }
      var lineData = []
      if(highSetting.markLineNumFlag){
        if(highSetting.markLineNum[i].x)
          lineData.push({xAxis:highSetting.markLineNum[i].x})
        if(highSetting.markLineNum[i].y)
          lineData.push({yAxis:highSetting.markLineNum[i].y})
      }else{
        lineData.push({type : 'average', name: '平均值'})
      }
      series.push({
        name: setting.seriesName[i],
        data: arr,
        type: 'scatter',
        symbolSize: function(value){
          return Number(value[2]) / total * 66 * Number(highSetting.symbolSize || 1)
        },
        symbol: highSetting.symbolImgFlag ? 'image://' + highSetting.symbolImg[i] : highSetting.symbol,
        itemStyle: {
          color: highSetting.itemColorFlag ? highSetting.itemColor[i] : ''
        },
        markPoint: {
          data: !highSetting.minMaxFlag ? [] : [
            {type: 'max', name: '最大值'},
            {type: 'min', name: '最小值'}
          ]
        },
        markLine: !highSetting.markLineFlag ? {} : {
          lineStyle: {
            normal: {
              type: highSetting.markLineType || 'solid'
            }
          },
          data: lineData
        },
        markArea: !highSetting.markAreaFlag ? {} : {
          silent: true,
          itemStyle: {
            normal: {
              color: highSetting.markAreaColor
            }
          },
          data: [[{
            coord: [highSetting.markAreaNum.x1, highSetting.markAreaNum.y1]
          },{
            coord: [highSetting.markAreaNum.x2, highSetting.markAreaNum.y2]
          }]]
        },
      })
    }
    if(highSetting.regressionFlag){
      var arr = []
      for(var j=0;j<data.xData[0].length;j++){
        arr.push([ data.xData[0][j],data.yData[0][j],data.seriesData[0][j] ])
      }
      var myRegression = ecStat.regression(highSetting.regressionType, arr)
      myRegression.points.sort(function(a, b) {
        return a[0] - b[0]
      })
      series.push({
        type: 'line',
        showSymbol: false,
        data: myRegression.points,
        markPoint: {
          itemStyle: {
            normal: {
              color: 'transparent'
            }
          },
          label: {
            normal: {
              show: true,
              position: 'left',
              formatter: myRegression.expression,
              textStyle: {
                color: '#333',
                fontSize: 14
              }
            }
          },
          data: [{
            coord: myRegression.points[myRegression.points.length - 1]
          }]
        }
      })
    }
  }
  var option = {
    title: {
      text: setting.title,
      left: setting.titleX + '%',
      top: setting.titleY + '%',
      subtext: setting.subTitle,
      sublink: setting.titleLink,
      textStyle: {
        color: setting.titleColor,
        fontWeight: 'bold'
      },
      subtextStyle: {
        color: setting.titleColor
      },
    },
    legend: {
      top: setting.legendY + '%',
      left: setting.legendX + '%',
      show: setting.legendFlag,
      orient: setting.legendDir == 0 ? 'horizontal' : 'vertical'
    },
    xAxis: {
      name: setting.xName,
      type: 'value',
      splitLine: {
        show: highSetting.splitLineFlag === undefined ? true : highSetting.splitLineFlag
      }
    },
    yAxis: {
      name: setting.yName,
      type: 'value',
      splitLine: {
        show: highSetting.splitLineFlag === undefined ? true : highSetting.splitLineFlag
      }
    },
    grid: {
      top: '50',
      bottom: '50',
      left: '50',
      right: '50'
    },
    toolbox: {
      top: 30,
      right: 20,
      show: true,
      feature: saveFlag == 1 ? {} : {
        saveAsImage: {}
      }
    },
    tooltip: {
      formatter: '{a}<br />{c}'
    },
    series: series
  }
  if(highSetting.visualMapFlag){
    option.visualMap = {
      min: highSetting.visualMin || 0,
      max: highSetting.visualMax || 100,
      dimension: 2,
      orient: 'vertical',
      right: 0,
      top: 200,
      itemHeight: 70,
      text: [highSetting.visualTitle || '标题'],
      calculable: true,
      inRange: {
        color: [highSetting.visualColor1 || '#123456', highSetting.visualColor2 || '#abcdef']
      }
    }
  }
  if(setting.backColorFlag){
    echarts.registerTheme('backColor' + setting.backColor,{
      backgroundColor: setting.backColor
    })
  }
  return {
    option: option,
    backColorFlag: setting.backColorFlag,
    backColor: setting.backColor,
    themeIndex: setting.themeIndex,
  }
}
function generateOptionTree(setting,data,highSetting,saveFlag = 0){
  // highSetting用不上
  var obj = {
    l: 'left',
    r: 'right',
    t: 'top',
    b: 'bottom'
  }
  var option = {
    title: {
      text: setting.title,
      left: setting.titleX + '%',
      top: setting.titleY + '%',
      subtext: setting.subTitle,
      sublink: setting.titleLink,
      textStyle: {
        color: setting.titleColor,
        fontWeight: 'bold'
      },
      subtextStyle: {
        color: setting.titleColor
      },
    },
    grid: {
      top: '50',
      bottom: '50',
      left: '50',
      right: '50'
    },
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: {
      type: 'tree',
      data: [data],
      expandAndCollapse: true,
      animationDuration: 550,
      animationDurationUpdate: 750,
      symbol: setting.symbol,
      symbolSize: setting.symbolSize || 7,
      layout: setting.layout || 'orthogonal',
      orient: setting.orient || 'LR',
      leaves: {
        label: {
          normal: {
            position: obj[(setting.orient || 'LR').slice(-1).toLowerCase()],
            color: setting.textColor || '#000'
          }
        }
      },
      label: {
        normal: {
          color: setting.textColor || '#000',
          position: obj[(setting.orient || 'LR').slice(0,1).toLowerCase()],
        }
      },
      lineStyle: {
        color: setting.lineColor || '#ccc'
      }
    },
    toolbox: {
      top: 30,
      right: 20,
      show: true,
      feature: saveFlag == 1 ? {} : {
        saveAsImage: {}
      }
    },
  }
  if(setting.backColorFlag){
    echarts.registerTheme('backColor' + setting.backColor,{
      backgroundColor: setting.backColor
    })
  }
  return {
    option: option,
    backColorFlag: setting.backColorFlag,
    backColor: setting.backColor,
    themeIndex: setting.themeIndex,
  }
}
export {generateOptionBar,generateOptionLine,generateOptionPie,generateOptionScatter,generateOptionTree}