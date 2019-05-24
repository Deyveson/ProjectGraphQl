import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from './../interfaces/ModelsInterface';

export interface PagamentoAttributes {
  codpedido: number;
  codpedpagto?: number;
  codtipopagto?: number;
  valor_pago?: number;
  parcela?: number;
  situacao?: string;
  cod_adm?: number;
}

export interface PagamentoInstance
  extends Sequelize.Instance<PagamentoAttributes>,
    PagamentoAttributes {}

export interface PagamentoPedidoModel
  extends BaseModelInterface,
    Sequelize.Model<PagamentoInstance, PagamentoAttributes> {}

export default (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes,
): PagamentoPedidoModel => {
  const Pagamento: PagamentoPedidoModel = sequelize.define(
    'Pagamento',
    {
      codpedido: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      codpedpagto: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      codtipopagto: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      valor_pago: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      parcela: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      situacao: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      cod_adm: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      schema: 'b2b',
      tableName: 'pedidos_pagamentos',
      timestamps: false,
    },
  );

  Pagamento.associate = (models: ModelsInterface): void => {
    Pagamento.belongsTo(models.Pedido, {
      as: 'pedidos',
      foreignKey: 'codpedido',
    });
  };

  return Pagamento;
};
