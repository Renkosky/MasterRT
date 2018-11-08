export default {
    theme: 'CSI-Loreal',
    themeConfig: {
        color: ['#f684a2', '#bd84c1', '#a2b5fe', '#febaa8', '#fee3a8', '#a6e6f1', '#a99df9', '#db8dd0'],
        backgroundColor: 'rgba(0, 0, 0, 0)',
        textStyle: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        title: {
            textStyle: {
                color: '#2d2d2d'
            },
            subtextStyle: {
                color: '#6e6b70'
            }
        },
        line: {
            itemStyle: {
                normal: {
                    borderWidth: 1
                }
            },
            lineStyle: {
                normal: {
                    width: 2
                }
            },
            symbolSize: 4,
            symbol: 'emptyCircle',
            smooth: false
        },
        radar: {
            itemStyle: {
                normal: {
                    borderWidth: 1
                }
            },
            lineStyle: {
                normal: {
                    width: 2
                }
            },
            symbolSize: 4,
            symbol: 'emptyCircle',
            smooth: false
        },
        bar: {
            itemStyle: {
                normal: {
                    barBorderWidth: 0,
                    barBorderColor: '#ccc',
                    barWidth: '4'
                },
                emphasis: {
                    barBorderWidth: 0,
                    barBorderColor: '#ccc',
                    barWidth: '4'
                }
            }
        },
        pie: {
            itemStyle: {
                normal: {
                    borderWidth: 0,
                    borderColor: '#ccc'
                },
                emphasis: {
                    borderWidth: 0,
                    borderColor: '#ccc'
                }
            }
        },
        scatter: {
            itemStyle: {
                normal: {
                    borderWidth: 0,
                    borderColor: '#ccc'
                },
                emphasis: {
                    borderWidth: 0,
                    borderColor: '#ccc'
                }
            }
        },
        boxplot: {
            itemStyle: {
                normal: {
                    borderWidth: 0,
                    borderColor: '#ccc'
                },
                emphasis: {
                    borderWidth: 0,
                    borderColor: '#ccc'
                }
            }
        },
        parallel: {
            itemStyle: {
                normal: {
                    borderWidth: 0,
                    borderColor: '#ccc'
                },
                emphasis: {
                    borderWidth: 0,
                    borderColor: '#ccc'
                }
            }
        },
        sankey: {
            itemStyle: {
                normal: {
                    borderWidth: 0,
                    borderColor: '#ccc'
                },
                emphasis: {
                    borderWidth: 0,
                    borderColor: '#ccc'
                }
            }
        },
        funnel: {
            itemStyle: {
                normal: {
                    borderWidth: 0,
                    borderColor: '#ccc'
                },
                emphasis: {
                    borderWidth: 0,
                    borderColor: '#ccc'
                }
            }
        },
        gauge: {
            itemStyle: {
                normal: {
                    borderWidth: 0,
                    borderColor: '#ccc'
                },
                emphasis: {
                    borderWidth: 0,
                    borderColor: '#ccc'
                }
            }
        },
        candlestick: {
            itemStyle: {
                normal: {
                    color: '#c23531',
                    color0: '#314656',
                    borderColor: '#c23531',
                    borderColor0: '#314656',
                    borderWidth: 1
                }
            }
        },
        graph: {
            itemStyle: {
                normal: {
                    borderWidth: 0,
                    borderColor: '#ccc'
                }
            },
            lineStyle: {
                normal: {
                    width: 1,
                    color: '#aaa'
                }
            },
            symbolSize: 4,
            symbol: 'emptyCircle',
            smooth: false,
            color: ['#f684a2', '#bd84c1', '#a2b5fe', '#febaa8', '#fee3a8', '#a6e6f1', '#a99df9', '#db8dd0'],
            label: {
                normal: {
                    textStyle: {
                        color: '#ffffff'
                    }
                }
            }
        },
        map: {
            itemStyle: {
                normal: {
                    areaColor: '#f0f0f0',
                    borderColor: '#cccccc',
                    borderWidth: 0.5
                },
                emphasis: {
                    areaColor: 'rgba(246,132,162,0.8)',
                    borderColor: '#ffffff',
                    borderWidth: 1
                }
            },
            label: {
                normal: {
                    textStyle: {
                        color: '#545454'
                    }
                },
                emphasis: {
                    textStyle: {
                        color: 'rgb(100,0,0)'
                    }
                }
            }
        },
        geo: {
            itemStyle: {
                normal: {
                    areaColor: '#f0f0f0',
                    borderColor: '#cccccc',
                    borderWidth: 0.5
                },
                emphasis: {
                    areaColor: 'rgba(246,132,162,0.8)',
                    borderColor: '#ffffff',
                    borderWidth: 1
                }
            },
            label: {
                normal: {
                    textStyle: {
                        color: '#545454'
                    }
                },
                emphasis: {
                    textStyle: {
                        color: 'rgb(100,0,0)'
                    }
                }
            }
        },
        categoryAxis: {
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#bfbfbf'
                }
            },
            axisTick: {
                show: true,
                lineStyle: {
                    color: '#bfbfbf'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#545454'
                }
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: ['#ccc']
                }
            },
            splitArea: {
                show: false,
                areaStyle: {
                    color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
                }
            }
        },
        valueAxis: {
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#333'
                }
            },
            axisTick: {
                show: true,
                lineStyle: {
                    color: '#333'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#545454'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#e9e9e9']
                }
            },
            splitArea: {
                show: false,
                areaStyle: {
                    color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
                }
            }
        },
        logAxis: {
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#bfbfbf'
                }
            },
            axisTick: {
                show: true,
                lineStyle: {
                    color: '#e9e9e9'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#545454'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#e9e9e9']
                }
            },
            splitArea: {
                show: false,
                areaStyle: {
                    color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
                }
            }
        },
        timeAxis: {
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#e9e9e9'
                }
            },
            axisTick: {
                show: true,
                lineStyle: {
                    color: '#333'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#333'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#e9e9e9']
                }
            },
            splitArea: {
                show: false,
                areaStyle: {
                    color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
                }
            }
        },
        toolbox: {
            iconStyle: {
                normal: {
                    borderColor: '#999'
                },
                emphasis: {
                    borderColor: '#666'
                }
            }
        },
        legend: {
            textStyle: {
                color: '#8c8c8c'
            }
        },
        tooltip: {
            axisPointer: {
                lineStyle: {
                    color: '#ccc',
                    width: 1
                },
                crossStyle: {
                    color: '#ccc',
                    width: 1
                }
            }
        },
        timeline: {
            lineStyle: {
                color: '#293c55',
                width: 1
            },
            itemStyle: {
                normal: {
                    color: '#293c55',
                    borderWidth: 1
                },
                emphasis: {
                    color: '#a9334c'
                }
            },
            controlStyle: {
                normal: {
                    color: '#293c55',
                    borderColor: '#293c55',
                    borderWidth: 0.5
                },
                emphasis: {
                    color: '#293c55',
                    borderColor: '#293c55',
                    borderWidth: 0.5
                }
            },
            checkpointStyle: {
                color: '#e43c59',
                borderColor: 'rgba(194,53,49, 0.5)'
            },
            label: {
                normal: {
                    textStyle: {
                        color: '#293c55'
                    }
                },
                emphasis: {
                    textStyle: {
                        color: '#293c55'
                    }
                }
            }
        },
        visualMap: {
            color: ['#bd84c1', '#f684a2', '#ffdbe4']
        },
        dataZoom: {
            backgroundColor: 'rgba(47,69,84,0)',
            dataBackgroundColor: 'rgba(47,69,84,0.3)',
            fillerColor: 'rgba(167,183,204,0.4)',
            handleColor: '#a7b7cc',
            handleSize: '100%',
            textStyle: {
                color: '#333'
            }
        },
        markPoint: {
            label: {
                normal: {
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                emphasis: {
                    textStyle: {
                        color: '#ffffff'
                    }
                }
            }
        }
    }
};
