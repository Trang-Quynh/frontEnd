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
    findOrderDetail: (orderDetailId: any) => Promise<any>;
    addOrderDetail: (idUser: any, idProduct: any) => Promise<any>;
    deleteOrderDetailSevice: (idUser: any, idOrderDetail: any) => Promise<void>;
    updateOrderDetailService: (idUser: any, idOrder: any, updateOrderDetail: any) => Promise<any>;
    checkOutService: (idOrder: any, userId: any) => Promise<any>;
}
declare const _default: UserService;
export default _default;
