declare class UserService {
    private userRepository;
    private orderRepository;
    private orderDetailRepository;
    constructor();
    createNewUser: (user: any) => Promise<any>;
    checkUser: (user: any) => Promise<any>;
    createNewOrder: (userId: any) => Promise<any>;
    findOrder: (userId: any) => Promise<any>;
    findOrderDetails: (orderId: any) => Promise<any>;
    addToOrder: (idUser: any, idProduct: any) => Promise<any>;
}
declare const _default: UserService;
export default _default;
