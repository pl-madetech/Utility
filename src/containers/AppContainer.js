import Database from "../gateways/Database";

class AppContainer {
    getDb = () => {
        return Database.getInstance();
    };
}

export default (() => {
    let instance;

    return {
        getInstance: () => {
            if (!instance) {
                instance = new AppContainer();
                delete instance.constructor;
            }

            return instance;
        },
    };
})();