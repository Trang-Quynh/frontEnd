declare class UserService {
    private userRepository;
    private orderRepository;
    private orderDetailRepository;
    private productRepository;
    constructor();
    createNewUser: (user: any) => Promise<any>;
    checkUser: (user: any) => Promise<any>;
    createNewOrder: (userId: any) => Promise<any>;
    findOrder: (userId: any) => Promise<any>;
    findOrderDetails: (orderId: any) => Promise<any>;
    addOrderDetail: (idUser: any, idProduct: any) => Promise<any>;
    deleteOrderDetail: (id: any) => Promise<void>;
}
declare const _default: UserService;
export default _default;
