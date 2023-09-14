export type User =
  | {
      id: string;
      name: string;
      email: string;
      isCustomer: true;
      customerData: {
        active: boolean;
        balanceCredits: number;
        cnpj: string;
        companyName: string;
        consumptionPlan: number;
        planPayment: "POS" | "PRE";
        posPaidPlanId: string;
      };
      created_at: string;
      updated_at: string;
    }
  | {
      id: string;
      name: string;
      email: string;
      isCustomer: false;
      created_at: string;
      updated_at: string;
    };
