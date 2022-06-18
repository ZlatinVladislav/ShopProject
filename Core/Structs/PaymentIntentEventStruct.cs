using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Struct
{
    public struct PaymentIntentEventStruct
    {
        public const string Success = "payment_intent.succeeded";
        public const string Failed = "payment_intent.payment_failed";
    }
}
