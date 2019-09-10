

// namespace Network.Socket.Decorators
// {
//     export class CReceiveClassAttribute extends System.CAttribute
//     {
//         private readonly m_receiverType: System.Reflection.CType< CReceiver > = null;

//         public constructor( receiverType: System.Reflection.CType< CReceiver > )
//         {
//             super();
//             this.m_receiverType = receiverType;
//         }

//         get ReceiveType(): System.Reflection.CType< CReceiver >
//         {
//             return this.m_receiverType;
//         }
//     }

//     export function ReceiveClass< TReceiver extends CReceiver >( type: System.Reflection.CType< CReceiver >  ): System.UDecoratorFunctionType_ForClass
//     {
//         return System.AttributeDecorate( new CReceiveClassAttribute( type ) );
//     }
// }