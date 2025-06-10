import Mock from "mockjs";

export default {
  getTableData: () => {
    return {
      code: 200,
      data: {
        tableData: [
          Mock.mock({
            name: "OPPO",
            todayBuy: "@integer(100, 1500)",
            monthBuy: "@integer(2000, 9000)",
            totalBuy: "@integer(10000, 70000)",
          }),
          Mock.mock({
            name: "华为",
            todayBuy: "@integer(100, 1500)",
            monthBuy: "@integer(2000, 9000)",
            totalBuy: "@integer(10000, 70000)",
          }),
          Mock.mock({
            name: "苹果",
            todayBuy: "@integer(100, 1500)",
            monthBuy: "@integer(2000, 9000)",
            totalBuy: "@integer(10000, 70000)",
          }),
          Mock.mock({
            name: "小米",
            todayBuy: "@integer(100, 1500)",
            monthBuy: "@integer(2000, 9000)",
            totalBuy: "@integer(10000, 70000)",
          }),
          Mock.mock({
            name: "vivo",
            todayBuy: "@integer(100, 1500)",
            monthBuy: "@integer(2000, 9000)",
            totalBuy: "@integer(10000, 70000)",
          }),
          Mock.mock({
            name: "三星",
            todayBuy: "@integer(100, 1500)",
            monthBuy: "@integer(2000, 9000)",
            totalBuy: "@integer(10000, 70000)",
          }),
          Mock.mock({
            name: "荣耀",
            todayBuy: "@integer(100, 1500)",
            monthBuy: "@integer(2000, 9000)",
            totalBuy: "@integer(10000, 70000)",
          }),
        ],
      },
    };
  },
  getCountData: () => {
    return {
      code: 200,
      data: {
        countData: [
          Mock.mock({
            name: "今日文章发布次数",
            value: "@integer(1, 50)",
            icon: "Edit",
            color: "#2ec7c9",
          }),
          Mock.mock({
            name: "今日文章收藏次数",
            value: "@integer(1, 1000)",
            icon: "StarFilled",
            color: "#ffb980",
          }),
          Mock.mock({
            name: "今日文章评论次数",
            value: "@integer(1, 1000)",
            icon: "ChatDotRound",
            color: "#5ab1ef",
          }),
          Mock.mock({
            name: "今日作者关注次数",
            value: "@integer(1, 35)",
            icon: "UserFilled",
            color: "#f97316",
          }),
          Mock.mock({
            name: "今日内容举报次数",
            value: "@integer(1, 50)",
            icon: "WarningFilled",
            color: "#722ed1",
          }),
          Mock.mock({
            name: "今日热门文章阅读次数",
            value: "@integer(50, 600)",
            icon: "View",
            color: "#f53f3f",
          }),
        ],
      },
    };
  },
  getChartData: () => {
    return {
      code: 200,
      data: {
        orderData: {
          date: Array.from({ length: 6 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (5 - i));
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          }),
          data: [
            Mock.mock({
              苹果: "@integer(4000, 7000)",
              小米: "@integer(2000, 7000)",
              华为: "@integer(2000, 7000)",
              oppo: "@integer(2000, 7000)",
              vivo: "@integer(2000, 7000)",
              一加: "@integer(2000, 7000)",
            }),
            Mock.mock({
              苹果: "@integer(4000, 7000)",
              小米: "@integer(2000, 7000)",
              华为: "@integer(2000, 7000)",
              oppo: "@integer(2000, 7000)",
              vivo: "@integer(2000, 7000)",
              一加: "@integer(2000, 7000)",
            }),
            Mock.mock({
              苹果: "@integer(4000, 7000)",
              小米: "@integer(2000, 7000)",
              华为: "@integer(2000, 7000)",
              oppo: "@integer(2000, 7000)",
              vivo: "@integer(2000, 7000)",
              一加: "@integer(2000, 7000)",
            }),
            Mock.mock({
              苹果: "@integer(4000, 7000)",
              小米: "@integer(2000, 7000)",
              华为: "@integer(2000, 7000)",
              oppo: "@integer(2000, 7000)",
              vivo: "@integer(2000, 7000)",
              一加: "@integer(2000, 7000)",
            }),
            Mock.mock({
              苹果: "@integer(4000, 7000)",
              小米: "@integer(2000, 7000)",
              华为: "@integer(2000, 7000)",
              oppo: "@integer(2000, 7000)",
              vivo: "@integer(2000, 7000)",
              一加: "@integer(2000, 7000)",
            }),
            Mock.mock({
              苹果: "@integer(4000, 7000)",
              小米: "@integer(2000, 7000)",
              华为: "@integer(2000, 7000)",
              oppo: "@integer(2000, 7000)",
              vivo: "@integer(2000, 7000)",
              一加: "@integer(2000, 7000)",
            }),
          ],
        },
        videoData: [
          Mock.mock({ name: "小米", value: "@integer(2000, 5000)" }),
          Mock.mock({ name: "苹果", value: "@integer(2000, 5000)" }),
          Mock.mock({ name: "vivo", value: "@integer(2000, 5000)" }),
          Mock.mock({ name: "oppo", value: "@integer(2000, 5000)" }),
          Mock.mock({ name: "魅族", value: "@integer(2000, 5000)" }),
          Mock.mock({ name: "三星", value: "@integer(2000, 5000)" }),
        ],
        userData: [
          Mock.mock({ date: "周一", new: "@integer(100, 300)", active: "@integer(200, 500)" }),
          Mock.mock({ date: "周二", new: "@integer(100, 300)", active: "@integer(200, 500)" }),
          Mock.mock({ date: "周三", new: "@integer(100, 300)", active: "@integer(200, 500)" }),
          Mock.mock({ date: "周四", new: "@integer(100, 300)", active: "@integer(200, 500)" }),
          Mock.mock({ date: "周五", new: "@integer(100, 300)", active: "@integer(200, 500)" }),
          Mock.mock({ date: "周六", new: "@integer(100, 300)", active: "@integer(200, 500)" }),
          Mock.mock({ date: "周日", new: "@integer(100, 300)", active: "@integer(200, 500)" }),
        ],
      },
    };
  },
};
