const helpers = require("../utils/helpers");

test("helpers.getDaysDifference returns number of days between two provided dates", () => {
    expect(helpers.getDaysDifference("Mon Aug 02 2021 20:40:24 GMT-0600", "2021-08-25T06:00:00.000Z")).toBe(22)
});

test("format_date() returns a date string", () => {
    const date = new Date('Mon Aug 02 2021 20:40:24 GMT-0600')
    expect(helpers.format_date(date)).toBe("8/2/2021")
});