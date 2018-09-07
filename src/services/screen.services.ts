import * as mu from 'mzmu';

export default {

    getOptions(sentiment) {
        let {time_serial: Serial, trend_Negative: Negative, trend_Positive: Positive, trend_Volume: Volume} = sentiment;

        let PositiveMax = Math.max(...Positive);
        let NegativeMax = Math.max(...Negative);
        let VolumeMax = Math.max(...Volume);

        Serial = mu.map(Serial, (d) => {
            return mu.format(new Date(d), 'M/d');
        });

        let option = {
            tooltip: {},
            grid: {},
            legend: {
                data: ['Positive', 'Negative', 'Total Buzz'],
                "textStyle": {
                    "color": "#fff"
                }
            },

            xAxis: {
                data: Serial,

                silent: false,

                axisLine: {
                    onZero: true
                },

                splitLine: {
                    show: false
                },

                splitArea: {
                    show: false
                },

                axisLabel: {
                    show: true,
                    margin: 20
                }
            },

            yAxis: [
                {
                    // inverse: true,
                    name: 'Buzz Volume',
                    nameGap: 45,
                    splitArea: {
                        show: false
                    },

                    min: -NegativeMax,
                    max: 2 * PositiveMax,
                    // interval: y0,

                    axisLine: {show: false},
                    axisLabel: {show: false},
                    axisTick: {show: false},
                    splitLine: {show: false}
                },
                {
                    // inverse: true,
                    min: -VolumeMax * (NegativeMax + PositiveMax) / (PositiveMax),
                    max: VolumeMax,
                    // interval: y1,
                    show: false,
                    splitArea: {
                        show: false
                    }
                }
            ],

            series: [
                {
                    name: 'Total Buzz',
                    type: 'line',
                    yAxisIndex: 1,
                    lineStyle: {
                        normal: {
                            color: '#2BFFD5',
                            width: 2
                        }
                    },
                    "textStyle": {
                        "color": "#fff"
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            formatter: function (a) {
                                return mu.format(a.value);
                            },
                            offset: [0, -10],
                            color: '#fff'
                        }
                    },
                    data: Volume
                },

                {
                    yAxisIndex: 0,
                    name: 'Positive',
                    type: 'bar',
                    barGap: 0,
                    label: {
                        normal: {
                            show: true,
                            color: '#fff',
                            position: 'top',
                            formatter: function (a) {
                                return mu.format(a.value);
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#63D9FF'
                        }
                    },
                    data: Positive
                },
                {
                    yAxisIndex: 0,
                    name: 'Negative',
                    type: 'bar',
                    // stack: 'one',
                    label: {
                        normal: {
                            show: true,
                            position: 'bottom',
                            formatter: function (a) {
                                return mu.format(-a.value);
                            }
                        }
                    },

                    itemStyle: {
                        normal: {
                            color: '#EF6948'

                        }
                    },

                    data: mu.map(Negative, (v) => {
                        return -v;
                    })
                }
            ]
        };

        return option;
    },

    listenerStorage() {
        let orignalSetItem = window.localStorage.setItem;

        window.localStorage.setItem = function (key, newValue) {

            let value: string;

            try {
                value = JSON.stringify(newValue);
            } catch (e) {
                value = newValue;
            }

            let setItemEvent = new Event("setItemEvent");
            setItemEvent['newValue'] = value;
            setItemEvent['key'] = key;
            window.dispatchEvent(setItemEvent);
            orignalSetItem.apply(this, arguments);
        };
    }

}