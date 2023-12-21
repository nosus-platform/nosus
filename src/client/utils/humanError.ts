export const humanError = (error: any, tr: (key: string) => string = (key) => key) => {
    try {
        const errorObject = JSON.parse(error.message);

        return errorObject.reduce((acc: any, curr: any) => {
            const path = curr.path.join();
            if (acc[path]) {
                acc[path].push(tr(curr.message));
            } else {
                acc[path] = [tr(curr.message)];
            }

            return acc;
        }, {});
    } catch (error) {
        return {};
    }
};
