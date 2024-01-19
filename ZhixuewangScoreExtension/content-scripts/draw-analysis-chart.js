import F2 from '@antv/f2';
// import subjectAnalysisData from '../../../../mock/subjectAnalysisData.json';
import APIService from '@/api/reportDetailWebServer.js';
import configs from './config.js';
export default {
  name: 'subject-analysis',
  props: {
    examId: {
      type: String,
      default: ''
    },
    paperId: {
      type: String,
      default: ''
    },
    subjectCode: {
      type: String,
      default: 'all'
    }
  },
  data () {
    return {
      moudel: 'subjectAnalysis',
      // 图表的名称
      chartName: '',
      subjectList: [],
      maxScore: 100,
      myRankName: '本次水平',
      classAvgRankName: '班级中等水平',
      myAvgRankName: '平时水平',
      result: '',
      // T分标题
      tScoreDesc: '',
      tScoreTitle: '',
      // 主标题
      title: '',
      // 副标题
      subTitle: '',
      // 主提示语
      tips: '',
      // 副提示语
      subTips: '',
      // 是否展示整个图表
      isShow: false,
      // 是否展示我的本次分数
      isShowMy: false,
      // 是否展示我的平均分
      isShowAvg: false,
      // 是否显示年级分数
      isShowGrade: false,
      // 是否展示班级分数
      isShowClass: false,
      // 科目大于9科 不展示标签
      isNormalRadar: false
    };
  },
  created () {

  },
  mounted () {
    this.getDataFromServer();
    // this.dealData(subjectAnalysisData.result);
  },
  methods: {

    resetStyle: function () {
      if (!(this.isShowMy && this.isShowAvg && this.isShowClass)) {
        if (this.isShowMy && !this.isShowAvg && !this.isShowClass && !this.isShowGrade) {
          let my = this.$refs.subject_analysis_legend_item_left;
          my.style.cssFloat = 'none';
        } else if (!this.isShowMy && this.isShowAvg && !this.isShowClass) {
          let myAvg = this.$refs.subject_analysis_legend_item_center;
          myAvg.style.cssFloat = 'none';
        } else if (this.isShowMy && !this.isShowAvg && this.isShowClass) {
          let my = this.$refs.subject_analysis_legend_item_left;
          let classAvg = this.$refs.subject_analysis_legend_item_right;
          classAvg.style.cssFloat = 'none';
          classAvg.style.marginLeft = '25px';
          my.style.cssFloat = 'none';
          my.style.marginRight = '25px';
        } else if (!this.isShowMy && this.isShowAvg && this.isShowClass) {
          let myAvg = this.$refs.subject_analysis_legend_item_center;
          let classAvg = this.$refs.subject_analysis_legend_item_right;
          classAvg.style.cssFloat = 'none';
          classAvg.style.marginLeft = '25px';
          myAvg.style.cssFloat = 'none';
          myAvg.style.marginRight = '25px';
        } else if (this.isShowMy && this.isShowAvg && !this.isShowClass) {
          let myAvg = this.$refs.subject_analysis_legend_item_center;
          let my = this.$refs.subject_analysis_legend_item_left;
          myAvg.style.cssFloat = 'none';
          myAvg.style.marginLeft = '25px';
          my.style.cssFloat = 'none';
          my.style.marginRight = '25px';
        }
      }
    },
    /**
     * 获取学科诊断数据（全） --edit by jmning 2018/11/30
     */
    getDataFromServer: function () {
      let that = this;
      let params = {
        examId: that.examId
      };
      APIService.getAllSubjectDiagnosis(params).then(response => {
        if (response.errorCode === 0) {
          if (response.result && response.result.list && response.result.list.length > 0) {
            that.dealData(response.result);
          } else {
            this.isShow = false;
          }
        } else {
          console.log('getAllSubjectDiagnosis errorCode: ' + response.errorCode + ' errorInfo: ' + response.errorInfo);
        }
      });
    },
    /**
     * 处理数据
     */
    dealData: function (data) {
      if (data) {
        this.result = data;
        // T分标题
        // debugger;
        this.tScoreDesc = this.result.tScoreDesc;
        this.tScoreTitle = this.result.tScoreTitle;
        this.title = this.result.title;
        this.subTitle = this.result.subtitle;
        this.tips = this.result.tips;
        this.subTips = this.result.subTips;
        const subject = JSON.parse(sessionStorage.getItem('subjectList'))
        // this.subjectList = this.result.list
        this.chartName = this.result.chartName;
        // 取出筛选数据项目
        subject.forEach((item) => {
          this.result.list.forEach((ele) => {
            if (item.subjectName === ele.subjectName) {
              this.subjectList.push(ele)
            }
          })
        })
        console.log(subject, this.subjectList, '筛选科目');
        // 学科数目大于2科  && 我的本次 || 班级平均 || 我的平均 都没有屏蔽时候展示
        if (this.subjectList && this.subjectList.length > 2) {
          if (this.subjectList[0].myRank || this.subjectList[0].myRank === 0) {
            // 是否展示我的本次分数
            this.isShowMy = true;
          } else {
            this.isShowMy = false;
          }
          // if (this.subjectList[0].avgRank || this.subjectList[0].avgRank === 0) {
          //   // 是否展示班级分数
          //   this.isShowClass = true;
          // } else {
          //   this.isShowClass = false;
          // }
          // if (this.subjectList[0].rationalRank || this.subjectList[0].rationalRank === 0) {
          //   // 是否展示我的平均分
          //   this.isShowAvg = true;
          // } else {
          //   this.isShowAvg = false;
          // }
          if (this.subjectList[0].avgRank || this.subjectList[0].avgRank === 0) {
            // 是否展示班级还是年级
            if (this.subjectList[0].showGradeSecondary) {
              this.isShowGrade = true
              this.isShowClass = false
            } else {
              this.isShowGrade = false
              this.isShowClass = true
            }
          }
          // 是否展示平均分
          if (this.isShowGrade) {
            this.isShowAvg = false;
          } else {
            this.isShowAvg = true
          }
          if (this.isShowMy || this.isShowAvg) {
            // 是否展示整个图表
            this.isShow = true;
          } else {
            this.isShow = false;
          }
        } else {
          this.isShow = false;
        }
        if (this.subjectList && this.subjectList.length > 9) {
          // 科目大于9科 不展示标签
          this.isNormalRadar = true;
        } else {
          this.isNormalRadar = false;
        }
        this.$nextTick(() => {
          this.convertRadarData();
        });
      }
    },

    /**
     * 处理数据
     */
    convertRadarData: function () {
      const radarData = [];
      if (this.subjectList && this.subjectList.length > 0) {
        for (var i = 0; i < this.subjectList.length; i++) {
          if (typeof (this.subjectList[i].avgRank) !== 'undefined') {
            // 班级中等
            radarData.push({
              item: this.subjectList[i].subjectName,
              user: this.classAvgRankName,
              score: (100 - this.subjectList[i].avgRank)
            });
          }
          // 加个判断 是否展示平均水平
          if (typeof (this.subjectList[i].rationalRank) !== 'undefined' && (this.subjectList[i].showGradeSecondary) === false) {
            // 我的平均水平
            radarData.push({
              item: this.subjectList[i].subjectName,
              user: this.myAvgRankName,
              score: (100 - this.subjectList[i].rationalRank)
            });
          }
          if (typeof (this.subjectList[i].myRank) !== 'undefined') {
            // 本次水平
            radarData.push({
              item: this.subjectList[i].subjectName,
              user: this.myRankName,
              score: (100 - this.subjectList[i].myRank)
            });
          }
        }
        console.info(radarData);
        this.drawRadar(radarData);
        this.resetStyle();
      }
    },

    /**
     * 画雷达图
     */
    drawRadar: function (radarData) {
      var _this = this;
      if (!radarData) {
        return;
      }
      let guideEles = this.$refs.subject_analysis_div_id.getElementsByClassName('guideWapper');
      if (guideEles) {
        while (guideEles.length > 0) {
          guideEles[0].remove();
        }
      }

      if (this.subjectList && this.subjectList.length === 3) {
        let legendDiv = this.$refs.subject_analysis_legend_div;
        legendDiv.style.marginTop = '-75px';
      }
      const chart = new F2.Chart({
        el: this.$refs.subjectAnalysis,
        width: this.$refs.subject_analysis_div_id.offsetWidth,
        height: this.$refs.subject_analysis_div_id.offsetWidth * 0.45,
        pixelRatio: window.devicePixelRatio,
        padding: 65
      });
      // 关闭 tooltip
      chart.tooltip(false);
      // 更多配置
      chart.coord('polar', {});
      // 关闭图例
      chart.legend(false);
      chart.source(radarData, {
        score: {
          min: -20,
          max: this.maxScore,
          nice: false,
          tickCount: 7
        }
      });

      var lable = null;

      if (this.isNormalRadar === true) {
        lable = function label (text, index, total) {
          return {
            fill: '#57595D',
            top: true,
            fontSize: 15
          };
        }
      }

      chart.axis('item', { // item轴的样式
        top: true,
        label: lable, // 隐藏坐标轴文本，重绘自定义文本
        grid (text, index) {
          return {
            stroke: '#DEE1E5',
            lineDash: null,
            lineWidth: 0.7
          };
        }
      });

      chart.axis('score', { // score轴的样式
        top: true,
        label: null,
        grid (text, index) {
          return {
            stroke: '#DEE1E5',
            lineDash: null,
            lineWidth: 0.7
          };
        }
      });

      const canvas = chart.get('canvas');
      const container = canvas.addGroup({ zIndex: -1 }); // canvas 上添加一个分组

      // 连线的颜色
      chart.line().position('item*score').color('user', (val) => {
        if (val == _this.myRankName) {
          return '#2675D8'; // 蓝色
        }
        if (val == _this.classAvgRankName) {
          return '#C5C9CE'; // 灰色
        }
        if (val == _this.myAvgRankName) {
          return '#FCA205'; // 黄色
        }
      }).style('user', {
        lineDash (val) {
          if (val == _this.classAvgRankName) {
            return [4, 10];
          }
          return null;
        },
        lineWidth (val) {
          return 2;
        }
      });

      // 点的颜色
      chart.point().position('item*score').color('user', (val) => {
        if (val == _this.myRankName) {
          return '#2675D8'; // 蓝色
        }
        if (val == _this.classAvgRankName) {
          return '#778899'; // 灰色
        }
        if (val == _this.myAvgRankName) {
          return '#FCA205'; // 黄色
        }
      }).style('user', {
        stroke: '#fff',
        opacity (val) {
          if (val == _this.classAvgRankName) { // 隐藏班级中等跟最大值的描点
            return 0;
          }
          return 1;
        }
      }).shape('user', function (val) {
        return 'circle';
      }).size(4);

      if (this.isNormalRadar === false) {
        var config = configs.getConfigByKey(this.subjectList.length);
        for (var i = 0; i < this.subjectList.length; i++) {
          var color = null;
          var tag = null;
          if (this.subjectList[i].tag) {
            var code = this.subjectList[i].tag.code;
            if (code === '0') {
              color = '#2675D8'; // 蓝色
            } else if (code === '2') {
              color = '#FCA205'; // 黄色
            } else if (code === '1') {
              color = '#F45653'; // 红色
            } else if (code === '3') {
              color = '#06C1AE'; // 绿色
            }
            tag = this.subjectList[i].tag.name;
          }
          var alignX = config[i].alignX;
          var offsetX = config[i].offsetX;
          var offsetY = config[i].offsetY;

          if (this.subjectList[i].tag) {
            offsetX = config[i].labelOffsetX;
            offsetY = config[i].labelOffsetY;
          }

          var html;
          if (color) {
            // 屏蔽图上主观性评语
            // html = '<div class="subject_analysis_mark_bg_div_mark">' +
            //   '<span>' + this.subjectList[i].subjectName + '</span>' +
            //   '<span class= "subject_analysis_mark_span" style="background:' + color + ';">' +
            //   tag + '</span>' + '</div>';
            html = '<div class="subject_analysis_mark_bg_div_mark">' +
              '<span>' + this.subjectList[i].subjectName + '</span>' + '</div>';
          } else {
            html = '<div class="subject_analysis_mark_bg_div_normal">' +
              this.subjectList[i].subjectName;
          }
          chart.guide().html({
            position: [this.subjectList[i].subjectName, this.maxScore],
            html: html,
            alignX: alignX,
            alignY: 'middle',
            offsetX: offsetX,
            offsetY: offsetY
          }); // 自定义绘制坐标轴文本
        }
      }

      chart.render();
      container.sort(); // 按照 zIndex 层级索引进行排序
      canvas.draw();
    }
  }

}