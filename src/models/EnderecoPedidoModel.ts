import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from './../interfaces/ModelsInterface';

export interface EnderecoAttributes {
  codpedend?: number;
  codpedido: number;
  codendereco?: number;
}

export interface EnderecoInstance
  extends Sequelize.Instance<EnderecoAttributes>,
    EnderecoAttributes {}

export interface EnderecoPedidoModel
  extends BaseModelInterface,
    Sequelize.Model<EnderecoInstance, EnderecoAttributes> {}

export default (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes,
): EnderecoPedidoModel => {
  const Endereco: EnderecoPedidoModel = sequelize.define(
    'Endereco',
    {
      codpedend: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      codpedido: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      codendereco: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      schema: 'b2b',
      tableName: 'pedidos_enderecos',
      timestamps: false,
    },
  );

  Endereco.associate = (models: ModelsInterface): void => {
    Endereco.belongsTo(models.Pedido, {
      as: 'pedidos',
      foreignKey: 'codpedido',
    });
  };

  return Endereco;
};
