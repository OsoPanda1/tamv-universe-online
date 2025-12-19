/**
 * TAMV CREDITS - Sistema Económico
 * Moneda interna, monetización y comisiones
 */

export interface TAMVCreditConfig {
  sellPrice: number; // USD por crédito de venta
  buybackPrice: number; // USD por crédito de recompra
  swapMargin: number; // Porcentaje
  purchaseFee: number; // Porcentaje
}

export interface MembershipTier {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  color: string;
}

export interface ServicePricing {
  service: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  commission: number;
  isDirectTicket: boolean;
}

export interface Transaction {
  id: string;
  type: "purchase" | "sale" | "swap" | "withdrawal" | "commission" | "reward";
  amount: number;
  currency: "TAMV" | "USD";
  fee: number;
  timestamp: Date;
  status: "pending" | "completed" | "failed";
  metadata: Record<string, any>;
}

class TAMVEconomySystem {
  private readonly creditConfig: TAMVCreditConfig = {
    sellPrice: 0.20, // $0.20 USD por venta
    buybackPrice: 0.15, // $0.15 USD recompra
    swapMargin: 0.25, // 25% margen swap
    purchaseFee: 0.20, // 20% compra/envío
  };

  private readonly membershipTiers: MembershipTier[] = [
    {
      id: "free",
      name: "Free",
      priceMonthly: 0,
      priceYearly: 0,
      features: ["Acceso básico al feed", "1 DreamSpace", "Chat público"],
      color: "bg-gray-600",
    },
    {
      id: "premium",
      name: "Premium",
      priceMonthly: 24.99,
      priceYearly: 249.90,
      features: [
        "Todo de Free",
        "3 DreamSpaces",
        "Isabella AI básico",
        "Sin publicidad",
        "Badge Premium",
      ],
      color: "bg-cyan-600",
    },
    {
      id: "vip",
      name: "VIP",
      priceMonthly: 29.99,
      priceYearly: 299.90,
      features: [
        "Todo de Premium",
        "5 DreamSpaces",
        "Isabella AI avanzado",
        "Acceso prioritario a eventos",
        "Badge VIP",
      ],
      color: "bg-purple-600",
    },
    {
      id: "elite",
      name: "Elite",
      priceMonthly: 39.99,
      priceYearly: 399.90,
      features: [
        "Todo de VIP",
        "10 DreamSpaces",
        "KAOS Audio 3D",
        "Descuentos marketplace",
        "Soporte prioritario",
        "Badge Elite",
      ],
      color: "bg-orange-600",
    },
    {
      id: "celestial",
      name: "Celestial",
      priceMonthly: 49.99,
      priceYearly: 499.90,
      features: [
        "Todo de Elite",
        "DreamSpaces ilimitados",
        "Isabella AI Premium",
        "Acceso beta features",
        "Mentorías exclusivas",
        "Badge Celestial holográfico",
      ],
      color: "bg-gradient-to-r from-yellow-400 to-amber-600",
    },
  ];

  private readonly servicePricing: ServicePricing[] = [
    // TAMV Créditos
    {
      service: "TAMV Créditos (venta)",
      category: "currency",
      minPrice: 0.20,
      maxPrice: 0.20,
      commission: 0.25,
      isDirectTicket: false,
    },
    {
      service: "TAMV Créditos (recompra)",
      category: "currency",
      minPrice: 0.15,
      maxPrice: 0.15,
      commission: 0.20,
      isDirectTicket: false,
    },
    // Marketplace
    {
      service: "Marketplace/Tienda Digital",
      category: "marketplace",
      minPrice: 1,
      maxPrice: 399,
      commission: 0.18, // 12-25% promedio
      isDirectTicket: false,
    },
    // Membresías especiales
    {
      service: "Membresía +18 Gold",
      category: "membership",
      minPrice: 9.99,
      maxPrice: 9.99,
      commission: 1.0, // 100% ticket directo
      isDirectTicket: true,
    },
    {
      service: "Membresía +18 Gold Plus",
      category: "membership",
      minPrice: 29.99,
      maxPrice: 29.99,
      commission: 1.0,
      isDirectTicket: true,
    },
    {
      service: "Membresía Empresarial/Custom",
      category: "membership",
      minPrice: 129.99,
      maxPrice: 599.99,
      commission: 1.0,
      isDirectTicket: true,
    },
    // Isabella AI Premium
    {
      service: "Isabella AI Premium (día)",
      category: "ai",
      minPrice: 4.99,
      maxPrice: 4.99,
      commission: 1.0,
      isDirectTicket: true,
    },
    {
      service: "Isabella AI Premium (semana)",
      category: "ai",
      minPrice: 14.99,
      maxPrice: 14.99,
      commission: 1.0,
      isDirectTicket: true,
    },
    {
      service: "Isabella AI Premium (mes)",
      category: "ai",
      minPrice: 24.99,
      maxPrice: 24.99,
      commission: 1.0,
      isDirectTicket: true,
    },
    // KAOS Audio 3D
    {
      service: "KAOS Audio 3D Premium (día)",
      category: "audio",
      minPrice: 4.99,
      maxPrice: 4.99,
      commission: 1.0,
      isDirectTicket: true,
    },
    {
      service: "KAOS Audio 3D Premium (semana)",
      category: "audio",
      minPrice: 14.99,
      maxPrice: 14.99,
      commission: 1.0,
      isDirectTicket: true,
    },
    {
      service: "KAOS Audio 3D Premium (mes)",
      category: "audio",
      minPrice: 24.99,
      maxPrice: 24.99,
      commission: 1.0,
      isDirectTicket: true,
    },
    // Protección de Privacidad
    {
      service: "Protección Privacidad",
      category: "privacy",
      minPrice: 9.99,
      maxPrice: 499.99,
      commission: 1.0,
      isDirectTicket: true,
    },
    // Conciertos/Eventos
    {
      service: "Conciertos/Eventos",
      category: "events",
      minPrice: 1,
      maxPrice: 3000,
      commission: 0.20,
      isDirectTicket: false,
    },
    // Cursos/Universidad
    {
      service: "Cursos/Universidad",
      category: "education",
      minPrice: 9.99,
      maxPrice: 50,
      commission: 0.16, // 15-18% promedio
      isDirectTicket: false,
    },
    // Publicidad XR
    {
      service: "Publicidad XR/Brand",
      category: "advertising",
      minPrice: 24.99,
      maxPrice: 499.99,
      commission: 0.25,
      isDirectTicket: false,
    },
    // API/White Label/SaaS
    {
      service: "API/White Label/SaaS",
      category: "developer",
      minPrice: 29.99,
      maxPrice: 599.99,
      commission: 0.12,
      isDirectTicket: false,
    },
    // MarketNFT
    {
      service: "MarketNFT/Royalties",
      category: "nft",
      minPrice: 1,
      maxPrice: 10000,
      commission: 0.11, // 8-15% promedio
      isDirectTicket: false,
    },
    // Backups/Auditoría
    {
      service: "Backups/Auditoría",
      category: "security",
      minPrice: 9.99,
      maxPrice: 499.99,
      commission: 1.0,
      isDirectTicket: true,
    },
    // Lotería TAMV
    {
      service: "Lotería TAMV (boleto)",
      category: "lottery",
      minPrice: 2,
      maxPrice: 2,
      commission: 0.08,
      isDirectTicket: false,
    },
    // Canales/Grupos
    {
      service: "Canales/Grupos Premium",
      category: "social",
      minPrice: 1,
      maxPrice: 99,
      commission: 0.18, // 12-25% promedio
      isDirectTicket: false,
    },
    // Chats Privados
    {
      service: "Chats Privados de Paga",
      category: "social",
      minPrice: 4.99,
      maxPrice: 24.99,
      commission: 0.50,
      isDirectTicket: false,
    },
  ];

  // Configuración de retiros
  private readonly withdrawalConfig = {
    minimumAmount: 50, // USD mínimo
    processingDays: [1, 16], // Días del mes
    feeRange: { min: 0.02, max: 0.05 }, // 2-5%
  };

  /**
   * Calcula el precio de venta de créditos TAMV
   */
  calculateCreditSale(amount: number): { total: number; fee: number; net: number } {
    const total = amount * this.creditConfig.sellPrice;
    const fee = total * this.creditConfig.swapMargin;
    return {
      total,
      fee,
      net: total - fee,
    };
  }

  /**
   * Calcula el precio de recompra de créditos TAMV
   */
  calculateCreditBuyback(amount: number): { total: number; fee: number; net: number } {
    const total = amount * this.creditConfig.buybackPrice;
    const fee = total * this.creditConfig.purchaseFee;
    return {
      total,
      fee,
      net: total + fee,
    };
  }

  /**
   * Calcula la comisión de TAMV para un servicio
   */
  calculateServiceCommission(
    service: string,
    price: number
  ): { commission: number; creatorReceives: number } {
    const serviceConfig = this.servicePricing.find((s) => s.service === service);
    
    if (!serviceConfig) {
      throw new Error(`Servicio no encontrado: ${service}`);
    }

    const commission = price * serviceConfig.commission;
    const creatorReceives = serviceConfig.isDirectTicket ? 0 : price - commission;

    return {
      commission,
      creatorReceives,
    };
  }

  /**
   * Calcula la tarifa de retiro
   */
  calculateWithdrawalFee(amount: number): { fee: number; net: number; eligible: boolean } {
    if (amount < this.withdrawalConfig.minimumAmount) {
      return {
        fee: 0,
        net: 0,
        eligible: false,
      };
    }

    // Fee basado en monto (mayor monto, menor porcentaje)
    const feeRate =
      amount >= 500
        ? this.withdrawalConfig.feeRange.min
        : amount >= 100
        ? 0.03
        : this.withdrawalConfig.feeRange.max;

    const fee = amount * feeRate;

    return {
      fee,
      net: amount - fee,
      eligible: true,
    };
  }

  /**
   * Obtiene próxima fecha de procesamiento de retiros
   */
  getNextWithdrawalDate(): Date {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    if (day < 1) {
      return new Date(year, month, 1);
    } else if (day < 16) {
      return new Date(year, month, 16);
    } else {
      // Próximo día 1
      return new Date(year, month + 1, 1);
    }
  }

  /**
   * Obtiene todos los niveles de membresía
   */
  getMembershipTiers(): MembershipTier[] {
    return [...this.membershipTiers];
  }

  /**
   * Obtiene precios de todos los servicios
   */
  getServicePricing(): ServicePricing[] {
    return [...this.servicePricing];
  }

  /**
   * Obtiene precios por categoría
   */
  getServicesByCategory(category: string): ServicePricing[] {
    return this.servicePricing.filter((s) => s.category === category);
  }

  /**
   * Simula una transacción (para desarrollo)
   */
  async simulateTransaction(
    type: Transaction["type"],
    amount: number,
    currency: "TAMV" | "USD"
  ): Promise<Transaction> {
    const transaction: Transaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      amount,
      currency,
      fee: type === "commission" ? amount * 0.1 : 0,
      timestamp: new Date(),
      status: "completed",
      metadata: {},
    };

    console.log(`[TAMV Economy] Transaction: ${JSON.stringify(transaction)}`);
    return transaction;
  }
}

// Singleton export
export const tamvEconomy = new TAMVEconomySystem();
