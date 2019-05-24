import { compareSync } from 'bcryptjs';
import * as Sequelize from 'sequelize';
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';
import { PerfilInstance } from './PerfilModel';
// import {encode} from "punycode";

export interface UsuarioAttributes {
  id_usuario?: number;
  cod_pessoa?: number;
  nome_usuario?: string;
  email?: string;
  login?: string;
  senha?: string;
}

export interface UsuarioInstance extends Sequelize.Instance<UsuarioAttributes>, UsuarioAttributes {
  perfis: PerfilInstance;
  isPassword(encodedPassword: string, password: string): boolean;
}

export interface UsuarioModel
  extends BaseModelInterface,
    Sequelize.Model<UsuarioInstance, UsuarioAttributes> {}

export const UsuarioMethods = {
  isPassword: (encodedPassword: string, password: string): boolean =>
    compareSync(password, encodedPassword),
};

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): UsuarioModel => {
  const Usuario: UsuarioModel = sequelize.define(
    'Usuario',
    {
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      cod_pessoa: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      nome_usuario: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      login: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
      },
      senha: {
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      schema: 'seguranca',
      tableName: 'usuarios',
      timestamps: false,
    },
  );

  Usuario.associate = (models: ModelsInterface): void => {
    Usuario.belongsToMany(models.Perfil, {
      as: 'perfis',
      through: 'usuarios_perfil',
      foreignKey: 'id_usuario',
      otherKey: 'id_perfil',
      timestamps: false,
    });
  };

  Usuario.prototype.isPassword = UsuarioMethods.isPassword;

  return Usuario;
};
