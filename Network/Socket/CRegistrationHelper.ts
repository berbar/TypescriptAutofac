

// namespace Network.Socket
// {
//     export class CRegistrationHelper
//     {
//         private readonly m_cb: Ioc.CContainerBuilder = null;

//         public constructor( cb: Ioc.CContainerBuilder )
//         {
//             this.m_cb = cb;
//         }

//         public RegisterSenders( senders: Array< System.Reflection.CType< ISender > > ): CRegistrationHelper
//         {
//             this.m_cb.RegisterTypes( senders ).AsSelf();
//             return this;
//         }

//         public RegisterReceivers( receivers: Array< System.Reflection.CType > ): CRegistrationHelper
//         {
//             this.m_cb.RegisterTypes( receivers ).AsSelf().InstancePerDependency();

//             return this;
//         }
//     }
// }
