'use client';

import { motion } from 'framer-motion';
import { Play, RotateCcw, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WorkflowNode from './WorkflowNode';
import type { Scenario, NodeStatus } from '@/lib/workflow-demo-data';

interface WorkflowCanvasProps {
  scenario: Scenario;
  activeNodes: Set<string>;
  completedNodes: Set<string>;
  activeConnections: Set<string>;
  isRunning: boolean;
  isCompleted: boolean;
  onRun: () => void;
  onReset: () => void;
  executionStatus: 'idle' | 'running' | 'completed';
}

function getNodeStatus(
  nodeId: string,
  activeNodes: Set<string>,
  completedNodes: Set<string>,
): NodeStatus {
  if (activeNodes.has(nodeId)) return 'processing';
  if (completedNodes.has(nodeId)) return 'completed';
  return 'idle';
}

interface ArrowProps {
  isActive: boolean;
  label?: string;
}

function Arrow({ isActive, label }: ArrowProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, gap: 2 }}>
      {label && (
        <span style={{ fontSize: 9, fontWeight: 600, color: isActive ? '#2B8FCC' : '#B0BAC8', letterSpacing: '0.04em' }}>
          {label}
        </span>
      )}
      <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, position: 'relative' }}>
        <div
          style={{
            width: 28,
            height: 2,
            background: isActive ? '#2B8FCC' : '#E8ECF0',
            position: 'relative',
            overflow: 'hidden',
            transition: 'background 300ms',
          }}
        >
          {isActive && (
            <motion.div
              style={{
                position: 'absolute',
                top: -3,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#2B8FCC',
              }}
              animate={{ x: [0, 28] }}
              transition={{ duration: 0.5, ease: 'easeInOut', repeat: Infinity }}
            />
          )}
        </div>
        <svg width="8" height="12" viewBox="0 0 8 12" style={{ flexShrink: 0 }}>
          <path
            d="M0 0 L8 6 L0 12"
            fill="none"
            stroke={isActive ? '#2B8FCC' : '#E8ECF0'}
            strokeWidth="2"
            style={{ transition: 'stroke 300ms' }}
          />
        </svg>
      </div>
    </div>
  );
}

function LinearRow({
  nodeIds,
  scenario,
  activeNodes,
  completedNodes,
  activeConnections,
}: {
  nodeIds: string[];
  scenario: Scenario;
  activeNodes: Set<string>;
  completedNodes: Set<string>;
  activeConnections: Set<string>;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'nowrap' }}>
      {nodeIds.map((id, i) => {
        const node = scenario.nodes.find((n) => n.id === id);
        if (!node) return null;
        const prevId = i > 0 ? nodeIds[i - 1] : null;
        const connKey = prevId ? `${prevId}->${id}` : null;
        const connActive = connKey ? activeConnections.has(connKey) : false;
        const conn = prevId
          ? scenario.connections.find((c) => c.from === prevId && c.to === id)
          : null;
        return (
          <div key={id} style={{ display: 'flex', alignItems: 'center' }}>
            {i > 0 && <Arrow isActive={connActive} label={conn?.label} />}
            <WorkflowNode
              node={node}
              status={getNodeStatus(id, activeNodes, completedNodes)}
            />
          </div>
        );
      })}
    </div>
  );
}

function BranchLayout({
  mainIds,
  branchId,
  scenario,
  activeNodes,
  completedNodes,
  activeConnections,
}: {
  mainIds: string[];
  branchId: string;
  scenario: Scenario;
  activeNodes: Set<string>;
  completedNodes: Set<string>;
  activeConnections: Set<string>;
}) {
  const branchNode = scenario.nodes.find((n) => n.id === branchId);
  const forkNodeId = mainIds[mainIds.length - 1];
  const branchConn = scenario.connections.find((c) => c.from === forkNodeId && c.to === branchId);
  const branchConnActive = activeConnections.has(`${forkNodeId}->${branchId}`);

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
      {/* Main row */}
      <LinearRow
        nodeIds={mainIds}
        scenario={scenario}
        activeNodes={activeNodes}
        completedNodes={completedNodes}
        activeConnections={activeConnections}
      />
      {/* Branch below fork */}
      {branchNode && (
        <div
          style={{
            marginTop: 8,
            marginLeft: 8,
            opacity: 0.55,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Arrow isActive={branchConnActive} label={branchConn?.label} />
          <WorkflowNode
            node={branchNode}
            status={getNodeStatus(branchId, activeNodes, completedNodes)}
          />
        </div>
      )}
    </div>
  );
}

function renderScenarioLayout(
  scenario: Scenario,
  activeNodes: Set<string>,
  completedNodes: Set<string>,
  activeConnections: Set<string>,
) {
  const allIds = scenario.nodes.map((n) => n.id);

  // Emailuri: n1->n2->n3->n4a->n5->n6->n7 with n4b as faded branch
  if (scenario.id === 'emailuri') {
    const mainRow = ['n1', 'n2', 'n3', 'n4a', 'n5', 'n6', 'n7'];
    const branchNode = scenario.nodes.find((n) => n.id === 'n4b');
    const branchConnActive = activeConnections.has('n3->n4b');
    const branchConn = scenario.connections.find((c) => c.from === 'n3' && c.to === 'n4b');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <LinearRow
          nodeIds={mainRow}
          scenario={scenario}
          activeNodes={activeNodes}
          completedNodes={completedNodes}
          activeConnections={activeConnections}
        />
        {branchNode && (
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 372, opacity: 0.5 }}>
            <Arrow isActive={branchConnActive} label={branchConn?.label} />
            <WorkflowNode
              node={branchNode}
              status={getNodeStatus('n4b', activeNodes, completedNodes)}
            />
          </div>
        )}
      </div>
    );
  }

  // Leaduri: n1->n2->n3->n4->n5a->n6->n7 with n5b faded
  if (scenario.id === 'leaduri') {
    const mainRow = ['n1', 'n2', 'n3', 'n4', 'n5a', 'n6', 'n7'];
    const branchNode = scenario.nodes.find((n) => n.id === 'n5b');
    const branchConnActive = activeConnections.has('n4->n5b');
    const branchConn = scenario.connections.find((c) => c.from === 'n4' && c.to === 'n5b');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <LinearRow
          nodeIds={mainRow}
          scenario={scenario}
          activeNodes={activeNodes}
          completedNodes={completedNodes}
          activeConnections={activeConnections}
        />
        {branchNode && (
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 520, opacity: 0.5 }}>
            <Arrow isActive={branchConnActive} label={branchConn?.label} />
            <WorkflowNode
              node={branchNode}
              status={getNodeStatus('n5b', activeNodes, completedNodes)}
            />
          </div>
        )}
      </div>
    );
  }

  // Suport: n1->n2->n3->n4a->n5->n6 with n4b faded
  if (scenario.id === 'suport') {
    const mainRow = ['n1', 'n2', 'n3', 'n4a', 'n5', 'n6'];
    const branchNode = scenario.nodes.find((n) => n.id === 'n4b');
    const branchConnActive = activeConnections.has('n3->n4b');
    const branchConn = scenario.connections.find((c) => c.from === 'n3' && c.to === 'n4b');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <LinearRow
          nodeIds={mainRow}
          scenario={scenario}
          activeNodes={activeNodes}
          completedNodes={completedNodes}
          activeConnections={activeConnections}
        />
        {branchNode && (
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 372, opacity: 0.5 }}>
            <Arrow isActive={branchConnActive} label={branchConn?.label} />
            <WorkflowNode
              node={branchNode}
              status={getNodeStatus('n4b', activeNodes, completedNodes)}
            />
          </div>
        )}
      </div>
    );
  }

  // Linear scenarios (documente, raportare)
  return (
    <LinearRow
      nodeIds={allIds}
      scenario={scenario}
      activeNodes={activeNodes}
      completedNodes={completedNodes}
      activeConnections={activeConnections}
    />
  );
}

export default function WorkflowCanvas({
  scenario,
  activeNodes,
  completedNodes,
  activeConnections,
  isRunning,
  isCompleted,
  onRun,
  onReset,
  executionStatus,
}: WorkflowCanvasProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F8FAFB' }}>
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          borderBottom: '1px solid #E8ECF0',
          background: 'white',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#0D1117' }}>
            {scenario.title}
          </span>
          {executionStatus === 'idle' && (
            <span style={{ fontSize: 10, background: '#F4F6F8', color: '#8A94A6', borderRadius: 20, padding: '2px 8px', fontWeight: 600 }}>
              INACTIV
            </span>
          )}
          {executionStatus === 'running' && (
            <span style={{ fontSize: 10, background: '#EAF5FF', color: '#2B8FCC', borderRadius: 20, padding: '2px 8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Loader2 size={10} style={{ animation: 'spin 0.7s linear infinite' }} />
              RULEAZA
            </span>
          )}
          {executionStatus === 'completed' && (
            <span style={{ fontSize: 10, background: '#D1FAE5', color: '#065F46', borderRadius: 20, padding: '2px 8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
              <CheckCircle size={10} />
              FINALIZAT
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {(executionStatus === 'running' || executionStatus === 'completed') && (
            <Button
              size="sm"
              variant="outline"
              onClick={onReset}
              leftIcon={<RotateCcw size={13} />}
            >
              Reset
            </Button>
          )}
          <Button
            size="sm"
            onClick={onRun}
            disabled={isRunning}
            leftIcon={isRunning ? <Loader2 size={13} style={{ animation: 'spin 0.7s linear infinite' }} /> : <Play size={13} />}
            style={{ background: '#2B8FCC', color: 'white' }}
          >
            {isRunning ? 'Ruleaza...' : 'Run'}
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div
        style={{
          flex: 1,
          overflowX: 'auto',
          overflowY: 'auto',
          padding: '24px 20px',
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        {renderScenarioLayout(scenario, activeNodes, completedNodes, activeConnections)}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
