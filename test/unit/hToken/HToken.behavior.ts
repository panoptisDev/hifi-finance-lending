import shouldBehaveLikeConstructor from "./deployment/constructor";
import shouldBehaveLikeBurn from "./effects/burn";
import shouldBehaveLikeMint from "./effects/mint";
import shouldBehaveLikeRedeem from "./effects/redeem";
import shouldBehaveLikeSetBalanceSheet from "./effects/setBalanceSheet";
import shouldBehaveLikeSupplyUnderlying from "./effects/supplyUnderlying";
import shouldBehaveLikeBalanceSheetGetter from "./view/balanceSheet";
import shouldBehaveLikeExpirationTimeGetter from "./view/expirationTime";
import shouldBehaveLikeIsMatured from "./view/isMatured";
import shouldBehaveLikeTotalUnderlyingSupplyGetter from "./view/totalUnderlyingSupply";
import shouldBehaveLikeUnderlyingGetter from "./view/underlying";
import shouldBehaveLikeUnderlyingPrecisionScalarGetter from "./view/underlyingPrecisionScalar";

export function shouldBehaveLikeHToken(): void {
  describe("Deployment", function () {
    shouldBehaveLikeConstructor();
  });

  describe("View Functions", function () {
    describe("balanceSheet", function () {
      shouldBehaveLikeBalanceSheetGetter();
    });

    describe("expirationTime", function () {
      shouldBehaveLikeExpirationTimeGetter();
    });

    describe("isMatured", function () {
      shouldBehaveLikeIsMatured();
    });

    describe("totalUnderlyingSupply", function () {
      shouldBehaveLikeTotalUnderlyingSupplyGetter();
    });

    describe("underlying", function () {
      shouldBehaveLikeUnderlyingGetter();
    });

    describe("underlyingPrecisionScalar", function () {
      shouldBehaveLikeUnderlyingPrecisionScalarGetter();
    });
  });

  describe("Effects Functions", function () {
    describe("burn", function () {
      shouldBehaveLikeBurn();
    });

    describe("mint", function () {
      shouldBehaveLikeMint();
    });

    describe("redeem", function () {
      shouldBehaveLikeRedeem();
    });

    describe("setBalanceSheet", function () {
      shouldBehaveLikeSetBalanceSheet();
    });

    describe("supplyUnderlying", function () {
      shouldBehaveLikeSupplyUnderlying();
    });
  });
}
