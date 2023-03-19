import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
    stable var currentValue: Float = 300;
    stable var initialTime: Int = Time.now();
    let interestRate = 0.001;

    public func topUp(amount: Float) {
        currentValue += amount;
        Debug.print(debug_show(currentValue));
    };

    public func withdrawl(amount: Float) {
        if (currentValue - amount: Float >= 0) {
            currentValue -= amount;
        } else {
            Debug.print("The amount is so bigger than current value! :<");
        };
    };

    public func compound() {
        let currentTime = Time.now();
        let timeAmount = currentTime - initialTime;

        currentValue := currentValue * Float.pow(1.0+interestRate, Float.fromInt(timeAmount)/(1000000000*60));
        initialTime := currentTime;
    };

    public query func checkBalance(): async Float {
        return currentValue;
    };
}